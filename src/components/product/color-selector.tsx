interface Color {
  name: string;
  value: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColorIndex: number;
  onColorSelect: (index: number) => void;
}

export const ColorSelector = ({ colors, selectedColorIndex, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase">Couleur</h3>
      <div className="flex gap-2">
        {colors.map((color, index) => (
          <button
            key={color.value}
            onClick={() => onColorSelect(index)}
            className={`h-10 w-10 rounded-full border-2 transition-all ${
              selectedColorIndex === index
                ? 'border-black scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

