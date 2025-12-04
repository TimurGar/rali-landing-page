import { useState } from "react";

import "./App.css";
import InputWithAnimatedPlaceholder from "./components/ui/InputWithAnimatedPlaceholder";
import Footer from "./components/Footer";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the form from refreshing the page
    console.log("Email submitted:", email);
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      // Get the actual message from API
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setEmail("");
      } else {
        // Error (status 409, 400, etc.)
        setMessage(result.message); // "Email already subscribed!"
      }

      setIsOpen(true);
    } catch (error) {
      setMessage("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="font-display p-4 max-w-6xl mx-auto w-full">
        <Analytics />

        {/* message */}
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-slate-50 border border-slate-200 shadow-2xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
                <DialogTitle as="h1" className="text-4xl mb-4">
                  {message.includes("Successfully") ? "🎉" : "😅"}
                </DialogTitle>
                <DialogTitle as="h1" className="text-xl font-medium">
                  {message.includes("Successfully") ? "Success!" : "Oh-oh!"}
                </DialogTitle>

                <p className="mt-2">
                  Your email has been{" "}
                  {message.includes("Successfully")
                    ? "successfully subscribed!"
                    : "already subscribed!"}
                </p>
                <p className="mt-2">
                  {message.includes("Successfully")
                    ? "You will now your first SpiderBytesV2 tomorrow."
                    : "Please try a different email address."}
                </p>

                <div class="mt-8 p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                  <div class="flex items-start gap-2">
                    <span class="flex-shrink-0">✉️</span>
                    <div class="flex-1">
                      Please make sure to check the{" "}
                      <span class="font-bold">spam folder</span> if you don't
                      see the email in your inbox.
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                    // className="mt-6 inline-flex items-center justify-center h-10 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-[#3B4697] to-[#485AE3] text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                    onClick={close}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>

        <div className="mt-10 flex flex-col md:flex-row md:gap-8 md:items-start md:justify-between">
          {/* left side */}
          <div className="flex-1 md:my-16">
            <h1 className="text-4xl font-bold">
              Canned coffeee like never before
              
            </h1>

            <form onSubmit={handleSubmit}>
              <InputWithAnimatedPlaceholder
                animatedTexts="name.lastname@richmond.edu"
                textColors={"#0E0E0E"}
                typingSpeed={150}
                className="mt-10"
                value={email}
                type="email"
                pattern=".*@*"
                title="Must be a valid email address"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />

              <button
                type="submit"
                className="mt-6 inline-flex items-center justify-center h-10 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-[#3B4697] to-[#485AE3] text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
