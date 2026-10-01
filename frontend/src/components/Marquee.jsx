const ITEMS = [
    "Black Pepper", "Turmeric", "Red Chilli", "Cloves", "Cardamom", "Garam Masala",
    "Cumin", "Coriander", "Bay Leaves", "Cinnamon", "Chaat Masala", "Fennel",
];

export const Marquee = () => (
    <div data-testid="spice-marquee" className="border-y border-gray-100 bg-[#FDFBF8] py-4 overflow-hidden select-none">
        <div className="flex w-max animate-marquee">
            {[0, 1].map((half) => (
                <div key={half} className="flex items-center" aria-hidden={half === 1}>
                    {ITEMS.map((item) => (
                        <span key={`${half}-${item}`} className="flex items-center">
                            <span className="font-display italic text-lg sm:text-xl text-gray-700 px-6 whitespace-nowrap">{item}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C8102E]/60" />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);
