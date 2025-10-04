export default function BlockchainExplainer() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Blockchain Is Not Your Crypto Casino
          </h2>
          
          <div className="space-y-6 text-lg">
            <div className="bg-card p-8 rounded-lg border">
              <p className="font-semibold mb-4">Blockchain is three stupidly simple ideas:</p>
              <ol className="space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">1.</span>
                  <span>Once I write something, I can't erase it.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">2.</span>
                  <span>Everyone can read it.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">3.</span>
                  <span>No one can secretly change the past.</span>
                </li>
              </ol>
              <p className="mt-4 font-semibold">That's it.</p>
            </div>

            <p className="text-muted-foreground">
              No moon coins. No Ponzi yields. No "degen farming."
            </p>
            
            <p className="font-bold text-2xl">
              Just an un-bribe-able ledger.
            </p>

            <div className="pt-6">
              <p className="text-xl">We're not selling tokens. We're selling truth.</p>
              <p className="text-2xl font-bold text-primary mt-2">
                And truth? It sells for 8–12% more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
