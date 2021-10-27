import type { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2");
  const data = await res.json();
  return { props: data };
};

const Home: NextPage = (
  prop: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [image, setImage] = useState<File>();
  const [createObjectURL, setCreateObjectURL] = useState("/vercel.svg");
  const [catOrDog, setCatOrDog] = useState("idk");

  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {
    const body = new FormData();
    if (image) body.append("image", image);
    const response = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      body,
    });
    console.log(response.json().then((res) => setCatOrDog(res)));
  };

  return (
    <div>
      <Image
        src={createObjectURL}
        alt="Uploaded image"
        width={300}
        height={200}
      />
      <h4>Select Image</h4>
      <input type="file" name="myImage" onChange={uploadToClient} />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
      <p>I believe this is a {catOrDog}.</p>
    </div>
  );
};

export default Home;
