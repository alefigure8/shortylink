import "../../styles/pages/dashboard/dashboard.css";
function DashboardMain() {
  return (
    <>
      <div className="dashboard-main-container">
        {/* CARDS */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div className="dashboard-card-title">Link</div>
            <div className="dashboard-card-content">1,000</div>
          </div>
          <div className="dashboard-card">
            <div className="dashboard-card-title">Visitas</div>
            <div className="dashboard-card-content">1,000</div>
          </div>
        </div>
        {/* Create link */}
        <div className="dashboard-create">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas quis minima laudantium non labore ab vel nulla? Aut voluptas eos facilis ratione eius voluptates nulla accusantium, explicabo ab saepe odio accusamus impedit sapiente dicta quam consequatur unde iusto sit officia?
        </div>
      </div>
    </>
  );
}

export default DashboardMain;
