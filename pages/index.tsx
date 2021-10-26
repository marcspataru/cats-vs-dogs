import type { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://postman-echo.com/get?foo1=bar1&foo2=bar2");
  const data = await res.json();
  return { props: data };
};

const Home: NextPage = (
  prop: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <p>Am primit {prop.args.foo1} de la nenea Postasu</p>;
};

export default Home;
