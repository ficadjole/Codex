type InputFieldProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function InputField({
  placeholder,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full 
                 bg-[#0C1618]
                 text-[#EAF4EF]
                 px-4 py-3 rounded-lg
                 border border-[#1F3337]
                 focus:outline-none
                 focus:border-[#3F8A4B]
                 focus:ring-1
                 focus:ring-[#3F8A4B]
                 transition duration-200"
    />
  );
}