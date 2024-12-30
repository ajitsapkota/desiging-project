export const searchPins = (pins: any[], searchTerm: string) => {
  if (!searchTerm.trim()) return pins;
  
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return pins.filter(pin => 
    pin.title.toLowerCase().includes(normalizedSearch) ||
    pin.author.toLowerCase().includes(normalizedSearch) ||
    pin.description?.toLowerCase().includes(normalizedSearch)
  );
};