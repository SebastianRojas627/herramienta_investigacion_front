interface ComponentProps {
  title: string;
}

const ButtonSubmit = ({ title }: ComponentProps) => {
  return (
    <>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {title}
      </button>
    </>
  );
};

export default ButtonSubmit;
