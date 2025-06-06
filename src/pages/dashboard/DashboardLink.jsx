import { useParams } from "react-router-dom";

function DashboardLink() {
  const {id} = useParams();

  return (
    <>
      <p>{id}</p>
    </>
  );
}

export default DashboardLink;