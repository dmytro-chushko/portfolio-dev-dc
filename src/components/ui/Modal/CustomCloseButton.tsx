export default function CustomCloseButton() {
  return (
    <button className="w-10 h-10 rounded-full bg-foreground p-2 fixed top-6 right-6 z-50 cursor-pointer hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-background"
      >
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
