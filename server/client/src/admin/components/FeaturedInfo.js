import { useEffect, useState } from "react";

// import "../admin.css";

export default function FeaturedInfo({ item }) {
  const [dateToFilter, setDateToFilter] = useState();

  useEffect(() => {
    // console.log(dateToFilter);
  }, [dateToFilter]);

  function selectOptions(e) {
    e.preventDefault();
    setDateToFilter(e.target.value);
  }

  return (
    <div className="featuredItem">
      <span className="featuredTitle">{item.title}</span>
      <button>
        {/* <label htmlFor="duration">Duration</label> */}
        <section style={{ marginLeft: "1rem" }}>
          <select
            name="noOfMonths"
            id="duration"
            className="options"
            value={dateToFilter}
            onChange={selectOptions}
          >
            <option value="Today">Today</option>
            <option value="Last month">Last month</option>
            <option value="Last year">Last year</option>
          </select>
        </section>
      </button>
      <div className="featuredMoneyContainer">
        <span className="featuredIcon">{item.icon}</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <span className="featuredPercentage">{item.number}</span>
          <span className="featuredPercentage">{item.percentage}</span>
        </div>
      </div>
    </div>
  );
}
