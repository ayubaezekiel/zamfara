export function Footer() {
  return (
    <footer className="bg-linear-to-r from-teal-600 to-emerald-700 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          Powered by <span className="font-semibold">TitanBridge</span>
        </p>
        <p className="text-sm mt-2">
          Contact us at{' '}
          <a
            href="mailto:info@titan-bridge.com"
            className="underline hover:text-teal-200 transition-colors duration-200"
          >
            info@titan-bridge.com
          </a>
        </p>
      </div>
    </footer>
  )
}
