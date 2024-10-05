
export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    const defaultStyles = `
         px-4 py-2 bg-indigo-500 rounded-full text-gray-500 shadow-md px-6 py-2 rounded-md
         transition-transform duration-300 transform 
         active:scale-95 focus:outline-none
    `;

    return (
        <button
            type={type}
            className={`${defaultStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
