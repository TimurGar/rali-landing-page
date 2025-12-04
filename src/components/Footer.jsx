import React from "react";

function Footer() {
  return (
    <div className="border-t border-neutral-100 bg-white px-8 py-20 mt-30">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row">
        {/* Left Section - Logo and Company Info */}
        <div>
          <div className="mr-4 mb-4 md:flex">
            <a
              className="flex space-x-2 text-2xl font-bold text-neutral-600  selection:bg-emerald-500 mr-10 py-0"
              href="/"
            >
              <img
                alt="Logo"
                loading="lazy"
                width="125"
                decoding="async"
                data-nimg="1"
                srcSet="/imgs/full-logo.png, /imgs/full-logo.png 2x"
                src="imgs/full-logo.png"
                style={{ color: "transparent" }}
              />
            </a>
          </div>

          <div>
            <p>
              Made by{" "}
              <span className="font-medium text-neutral-600">Timur</span>
            </p>
            <p className="mt-2">
              <span className="font-medium text-neutral-600">2025</span>
            </p>
          </div>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="mt-10 grid grid-cols-3 items-start gap-10 md:mt-0">
          {/* First Column */}
          <div className="mt-4 flex flex-col justify-center space-y-4">
            <a
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
              href="#"
            >
              Optimize your Post
            </a>
          </div>

          {/* Second Column */}
          <div className="mt-4 flex flex-col justify-center space-y-4">
            <a
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
              href="https://wwws.richmond.edu/spiderbytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Event
            </a>
            <a
              className="hover:text-foreground/80 text-foreground/60 transition-colors"
              href="https://wwws.richmond.edu/spiderbytes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Archive
            </a>
          </div>

          {/* Third Column */}
          <div className="mt-4 flex flex-col justify-center space-y-4">
            <div className="self-center">
              <a
                href="https://www.buymeacoffee.com/bookwurm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: "25px" }}
                />
              </a>
            </div>
            {/* <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                href="https://twitter.com/your-handle"
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
                href="https://github.com/your-username"
              >
                GitHub
              </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
