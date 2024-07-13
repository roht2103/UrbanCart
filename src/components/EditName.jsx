import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useState } from "react";
const EditName = ({ name, email, setEditNameWindow }) => {
  const [newName, setNewName] = useState();
  const updateName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:1000/account/profile/edit-name",
        {
          email: email,
          name: newName,
        }
      );
    } catch (error) {
      console.error("There was an error updating the product quantity!", error);
    }
    setEditNameWindow(false);
  };
  return (
    <div className="absolute top-60 w-4/12">
      <section className="bg-gray-100 rounded-t-md p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Edit your name</h1>
        <RxCross2
          className="text-xl cursor-pointer"
          onClick={() => setEditNameWindow(false)}
        />
      </section>
      <section className="rounded-b-md p-4 bg-white shadow-xl flex flex-col">
        <p>
          Changes made to your profile name here, will be shown anywhere your
          profile is used.
        </p>
        <form onSubmit={(e) => updateName(e)}>
          <input
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            className="w-full mt-6 p-1 outline outline-2 outline-offset-2 border-0 rounded-sm"
          />
          <input
            type="submit"
            value="Save Changes"
            className="mt-3 bg-[#FFBD59] py-1 px-2 rounded-md right-0 cursor-pointer"
          />
        </form>
      </section>
    </div>
  );
};
export default EditName;
