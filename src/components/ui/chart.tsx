"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import type { TooltipProps } from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color);

  if (!colorConfig.length) {
    return null;
  }

  // IMPORTANT: quote the attribute selector value to produce valid CSS
  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const body = colorConfig
        .map(([key, itemConfig]) => {
          const color =
            (itemConfig as any).theme && theme in (itemConfig as any).theme
              ? (itemConfig as any).theme[theme]
              : (itemConfig as any).color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join("\n");
      return `${prefix} [data-chart="${id}"] {\n${body}\n}`;
    })
    .join("\n");

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
};

const ChartTooltip = RechartsPrimitive.Tooltip;

// Tooltip props combining Recharts Tooltip + our custom options
type CustomTooltipProps = TooltipProps<any, any> & {
  payload?: any;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
};

type ChartPayloadItem = {
  name?: string;
  dataKey?: string | number;
  value?: number | string | null;
  payload?: Record<string, any>;
  color?: string;
  // allow any other fields from Recharts
  [k: string]: any;
};

const ChartTooltipContent = React.forwardRef<HTMLDivElement, CustomTooltipProps>(
  (
    {
      active,
      payload,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      labelFormatter,
      labelClassName,
      formatter,
      nameKey,
      labelKey,
      ...props
    },
    ref
  ) => {
    // cast once and guard
    const payloadItems: ChartPayloadItem[] = (payload ?? []) as ChartPayloadItem[];

    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payloadItems?.length) return null;

      const [item] = payloadItems;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const value = itemConfig?.label;

      if (labelFormatter) {
        // labelFormatter expects (value, payload) per Recharts TS; we pass payloadItems for convenience
        return (
          <div className={cn("font-medium", labelClassName as string | undefined)}>
            {labelFormatter(value, payloadItems as unknown as any)}
          </div>
        );
      }

      if (!value) return null;

      return <div className={cn("font-medium", labelClassName as string | undefined)}>{value}</div>;
    }, [labelFormatter, payloadItems, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payloadItems?.length) return null;

    const nestLabel = payloadItems.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
    undefined
        )}
        {...(props as any)}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payloadItems.map((rawItem, idx) => {
            const item = rawItem as ChartPayloadItem;
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = item.payload?.fill || item.color;

            return (
              <div
                key={`${item.dataKey ?? item.name ?? idx}`}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  // formatter signature is (value, name, entry, index, payload)
                  (formatter as any)(item.value, item.name, item, idx, payloadItems as any)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>
                      </div>
                      {item.value !== undefined && item.value !== null && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    hideIcon?: boolean;
    nameKey?: string;
    payload?: ChartPayloadItem[] | any[];
    verticalAlign?: "top" | "middle" | "bottom";
  }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey, ...props }, ref) => {
  const payloadItems: ChartPayloadItem[] = (payload ?? []) as ChartPayloadItem[];
  const { config } = useChart();

  if (!payloadItems?.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className as string | undefined)}
      {...(props as any)}
    >
      {payloadItems.map((rawItem, idx) => {
        const item = rawItem as ChartPayloadItem;
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={`${item.dataKey ?? item.name ?? idx}`} className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <span>{itemConfig?.label ?? item.name}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) return undefined;

  // payload may include nested payload field (Recharts uses this)
  const payloadPayload =
    "payload" in (payload as any) && typeof (payload as any).payload === "object" && (payload as any).payload !== null
      ? (payload as any).payload
      : undefined;

  let configLabelKey: string = key;

  if (key in (payload as any) && typeof (payload as any)[key] === "string") {
    configLabelKey = (payload as any)[key] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === "string") {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : (config[key as keyof typeof config] as any) || undefined;
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
