import { useState } from "react";

import "./App.css";
import InputWithAnimatedPlaceholder from "./components/ui/InputWithAnimatedPlaceholder";
// import Footer from "./components/Footer";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    console.log("Setting loading to true");
    setIsLoading(true);

    try {
      console.log("Sending fetch request to /api/subscribe");
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Get the actual message from API
      const result = await response.json();
      console.log("API result:", result);

      if (response.ok) {
        setMessage(result.message);
        setEmail("");
      } else {
        // Error (status 409, 400, etc.)
        setMessage(result.message);
      }

      setIsOpen(true);
      console.log("Dialog opened");
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Error connecting to server. Please try again.");
      setIsOpen(true);
    } finally {
      console.log("Setting loading to false");
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
      <div
        className="bg-black font-display w-screen h-screen fixed inset-0"
        style={{
          backgroundImage: "url(/rali-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto p-4 h-full">
          <p className="text-white font-lg mt-2">@ralithetroops</p>
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
                    You have {" "}
                    {message.includes("Successfully")
                      ? "successfully waitlisted!"
                      : "already waitlisted!"}
                  </p>
                  <p className="mt-2">
                    {message.includes("Successfully")
                      ? "Please be sure to check your email for further updates."
                      : "Please try a different email address."}
                  </p>

                  {/* <div class="mt-8 p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                    <div class="flex items-start gap-2">
                      <span class="flex-shrink-0">✉️</span>
                      <div class="flex-1">
                        Please make sure to check the{" "}
                        <span class="font-bold">spam folder</span> if you don't
                        see the email in your inbox.
                      </div>
                    </div>
                  </div> */}

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

          <div className="flex items-center mt-40 md:mt-6">
            <div className="flex flex-col md:flex-row md:gap-8 md:items-start md:justify-between gap-4 w-full">
              {/* left side */}
              <div className="flex-1 md:my-16">
                <h1 className="text-5xl md:text-8xl font-semibold text-white">
                  Canned coffee <br /> like never before
                </h1>
                <div className="mt-10">
                  <div className="max-w-100 mx-auto ">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-row gap-4"
                    >
                      {/* <p className="text-lg text-neutral-600 flex my-2">
                      I am interested
                    </p> */}
                      <InputWithAnimatedPlaceholder
                        animatedTexts="name.lastname@richmond.edu"
                        textColors={"#0E0E0E"}
                        typingSpeed={150}
                        value={email}
                        type="email"
                        pattern=".*@*"
                        title="Must be a valid email address"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full md:w-72 lg:w-96"
                        required
                        disabled={isLoading}
                      />

                      <button
                        type="submit"
                        className="px-4 py-1 rounded-lg transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white shadow-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Subscribing..." : "Waitlist"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer
        <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default App;
