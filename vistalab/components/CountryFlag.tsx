export function CountryFlag({ country, image }: { country: string; image?: string }) {
  if (image) return <img src={image} alt={`${country} flag`} className="h-6 w-10 rounded object-cover shadow-sm" />;
  if (country.toLowerCase() !== 'malaysia') return <span className="text-[10px] font-bold text-amber-800">{country}</span>;
  return (
    <svg role="img" aria-label="Flag of Malaysia" viewBox="0 0 60 30" className="h-6 w-10 rounded-[3px] shadow-sm">
      {Array.from({ length: 14 }, (_, index) => <rect key={index} x="0" y={index * (30 / 14)} width="60" height={30 / 14 + 0.1} fill={index % 2 === 0 ? '#d71920' : '#fff'} />)}
      <rect width="27" height="16" fill="#071b69" />
      <circle cx="10.5" cy="8" r="5.4" fill="#ffcf00" />
      <circle cx="12.7" cy="6.8" r="4.5" fill="#071b69" />
      <text x="19" y="11" fill="#ffcf00" fontSize="8" textAnchor="middle">★</text>
    </svg>
  );
}
