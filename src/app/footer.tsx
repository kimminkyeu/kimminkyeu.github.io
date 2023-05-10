export default function Footer() {
  return (
    <>
      <footer className="body-font fixed bottom-0 w-full text-gray-600">
        <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
          <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
            © {new Date().getFullYear()} Minky-Graphics —
            <a
              href="https://www.instagram.com/kyeu_min/"
              className="ml-1 text-gray-600"
              rel="noopener noreferrer"
              target="_blank"
            >
              @kimminkyeu
            </a>
          </p>
          <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
            <a
              href="https://www.instagram.com/kyeu_min/"
              className="ml-3 text-gray-500"
            >
              {' '}
              {/** Instagram */}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/minkyeu-kim-56906b172/"
              className="ml-3 text-gray-500"
            >
              {' '}
              {/** Linkedin */}
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}
