import React, { useState } from "react";

const spendDatas = [
  {
    description: "Beli jajan di indomaret",
    wallet: "Cash",
    amount: 10000,
    date: "2022-12-05",
  },
  {
    description: "Beli Indomaret",
    wallet: "Tapcash",
    amount: 200000,
    date: "2022-12-05",
  },
  {
    description: "Tabungan",
    wallet: "BCA",
    amount: 2000000,
    date: "2022-12-05",
  },
];

function SpendItem(props) {
  const data = props.data;

  return (
    <div className="flex flex-col bg-white p-4 drop-shadow-lg rounded-md text-left space-y-2">
      <div className="flex flex-row space-x-4 text-sm items-center">
        <div className="font-bold text-blue-400">{data.date}</div>
        <div className="opacity-80 bg-yellow-200 px-3 rounded-lg">
          {data.wallet}
        </div>
      </div>

      <div className="flex flex-col font-sans md:flex-row justify-between md:items-center space-y-2">
        <div className="text-xl md:text-2xl font-thin">{data.description}</div>
        <div className="text-lg md:text-xl font-semibold text-green-400">
          Rp. {data.amount}
        </div>
      </div>
    </div>
  );
}

const Input = (props) => {
  const {
    id,
    wrapperClassName = "",
    placeholder = "",
    label = "",
    type = "text",
    error = "",
    required = false,
    ...rest
  } = props;

  return (
    <div className={wrapperClassName}>
      <div
        className={`border transition duration-150 ease-in-out ${
          error
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary border-gray-gray4"
        }`}
      >
        <label
          htmlFor={id}
          className="text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5"
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
        <input
          type={type}
          className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md"
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {error && <p className="text-xs pl-2 text-red mb-4">{error}</p>}
    </div>
  );
};

const Home = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col w-3/4 mx-auto h-screen">
      <div className="flex-1 flex-col justify-center my-5">
        <div className="text-2xl md:text-5xl my-4 border-4 border-dotted py-3">
          Today Spends
        </div>

        <div className="space-y-4 p-5 bg-slate-200 rounded-lg">
          <SpendItem data={spendDatas[0]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
          <SpendItem data={spendDatas[1]} />
        </div>
      </div>

      <div className="sticky bg-red-200 py-4 rounded-xl bottom-0">
       

        <button onClick={() => console.log(description)}>Sub</button>
      </div>
    </div>
  );
};

export default Home;
