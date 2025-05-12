
export function CircuitPattern() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.05]">
      <defs>
        <pattern
          id="health-circuit-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 50L25 50M25 50L25 75M25 75L50 75M50 75L50 50M50 50L75 50M75 50L75 25M75 25L100 25"
            fill="none"
            stroke="#00814A"
            strokeWidth="0.7"
          />
          <path
            d="M0 25L25 25M25 25L25 0"
            fill="none"
            stroke="#C3A86B"
            strokeWidth="0.7"
          />
          <path 
            d="M50 0L50 25M50 25L75 25"
            fill="none"
            stroke="#00814A"
            strokeWidth="0.7"
          />
          <path
            d="M0 75L25 75"
            fill="none"
            stroke="#C3A86B"
            strokeWidth="0.7"
          />
          <circle cx="25" cy="25" r="2" fill="#00814A" opacity="0.5" />
          <circle cx="75" cy="25" r="2" fill="#C3A86B" opacity="0.5" />
          <circle cx="25" cy="75" r="2" fill="#C3A86B" opacity="0.5" />
          <circle cx="50" cy="75" r="2" fill="#00814A" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#health-circuit-pattern)" />
    </svg>
  );
}
