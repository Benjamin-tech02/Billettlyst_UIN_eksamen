const Dashboard = () => {
    return (
        <section className="dashboard-seksjon">
            <h1>Dashboard</h1>
            <form>
                <label> Brukernavn:
                    <input type="text" />
                </label>
                <button type="submit">Logg inn</button>
            </form>
        </section>
    );
};
  
export default Dashboard;