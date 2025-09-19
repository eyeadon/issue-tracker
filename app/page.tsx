import Pagination from "./components/Pagination";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
  );
};

export default Home;
