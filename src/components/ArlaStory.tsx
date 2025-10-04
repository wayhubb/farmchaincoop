import { Card } from "@/components/ui/card";

export default function ArlaStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            From 12 Farmers to €13bn Global Brand—How Arla Did It
          </h2>
          
          <Card className="p-8 mb-8">
            <p className="text-lg mb-6 leading-relaxed">
              In 1882, twelve Danish dairy farmers pooled milk into one shared creamery. They standardised feed, bought vaccines in bulk, built cold-chain routes, and sold cartons under a single brand. Today, Arla has 12,000 farmer-owners, €13 bn turnover, and shelves from Lagos to London.
            </p>
            <p className="text-lg font-semibold text-primary">
              The trick? A cooperative common-facility model: farmers own the animals. Arla owns the plants. Everyone shares the NET profit after costs.
            </p>
          </Card>

          <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Why Cattle—Why Nigeria—Why Now?</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Nigeria eats <span className="font-semibold text-foreground">1.2 billion kg of beef yearly</span>—yet imports 25%. Why? Because 85% of our beef comes from 24-month pastoral treks with 12% weight loss and 8% mortality. Because middle-men control pricing. Because no one can prove where your steak came from.
              </p>
              <p>
                <span className="font-semibold text-foreground">EU Regulation 2025</span> makes full blockchain traceability mandatory for all imported red meat in 14 months. Walmart, Carrefour, JD.com already demand it. Dubai shelves pay <span className="font-semibold text-foreground">40% more</span> for traced beef. Recall time drops from 7 days to 2.3 seconds. The <span className="font-semibold text-foreground">$18 billion export market</span> is locked behind one condition: <span className="font-bold text-destructive">SHOW ME THE DATA.</span>
              </p>
            </div>
          </div>

          <div className="bg-destructive text-destructive-foreground p-6 rounded-lg text-center">
            <p className="text-xl font-bold">
              EITHER NIGERIAN CATTLE HIT THAT STANDARD — OR THE $18 BILLION TRAIN LEAVES WITHOUT US.
            </p>
          </div>

          <p className="text-center text-lg mt-8 font-medium">
            That&apos;s why we built FarmChain CFC: <span className="text-primary">Arla&apos;s playbook. Blockchain&apos;s rails. Your cattle.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
