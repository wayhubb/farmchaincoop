import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function MarketDepth() {
  const comparisons = [
    {
      metric: "Time to Market",
      pastoral: "24 months",
      farmchain: "120 days",
      improvement: "90% faster",
    },
    {
      metric: "Distance Traveled",
      pastoral: "400 km",
      farmchain: "90 km",
      improvement: "77% less",
    },
    {
      metric: "Weight Change",
      pastoral: "-12% loss",
      farmchain: "+18% gain",
      improvement: "+30% total",
    },
    {
      metric: "Mortality Rate",
      pastoral: "8%",
      farmchain: "<1%",
      improvement: "87% lower",
    },
    {
      metric: "Live-Weight Price",
      pastoral: "₦1,750/kg",
      farmchain: "₦2,100/kg",
      improvement: "17% higher",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why We Beat Pastoral Time-to-Market
          </h2>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Metric</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <X className="w-5 h-5 text-destructive" />
                        <span>Pastoral Trek</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary" />
                        <span>FarmChain CFC</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-6 py-4 font-medium">{row.metric}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.pastoral}</td>
                      <td className="px-6 py-4 font-semibold">{row.farmchain}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          <Check className="w-4 h-4" />
                          {row.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="bg-destructive text-destructive-foreground p-6 rounded-lg text-center mt-8">
            <p className="text-xl font-bold mb-2">
              Pastoral beef spends two years on hooves.
            </p>
            <p className="text-lg">
              Our members turn weaners to cash in 120 days.<br />
              Same Wudil. Same Mile 12. Same Gulf buyers. Already waiting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
