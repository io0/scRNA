function plot(sample) {
  // const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  let width = 300;
  let height = 200;
  const svg = d3
    .select("#plot")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  let margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50,
  };
  // svg.append("g")
  //   .call(xAxis)
  //   .call(g => g.selectAll(".tick line")
  //   .clone()
  //     .attr("stroke-opacity", 0.1)
  //     .attr("y1", -height + margin.top + margin.bottom));

  // svg.append("g")
  //   .call(yAxis)
  //   .call(g => g.selectAll(".tick line")
  //   .clone()
  //     .attr("stroke-opacity", 0.1)
  //     .attr("x1", width - margin.left - margin.right));

  binWidth = 0.1;
  const x = d3
    .scaleLinear()
    .domain(d3.extent(sample))
    .nice()
    .range([margin.left, width - margin.right]);
  const bins = d3
    .histogram()
    .domain(x.domain())
    .thresholds(d3.range(...x.domain(), binWidth))(sample);
  y = d3
    .scaleLinear()
    .domain([0, d3.max([10, d3.max(bins, (d) => d.length)])])
    .nice()
    .range([height - margin.bottom, margin.top]);
  svg
    .append("g")
    .attr("fill", "#a0b0c0")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", (d) => x(d.x0) + 1)
    .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
    .attr("y", (d) => y(d.length))
    .attr("height", (d) => y(0) - y(d.length));

  console.log(svg);

  // svg.append("line")
  //   .attr("stroke", "black")
  //   .attr("x1", x(sample_mean))
  //   .attr("y1", y(y.domain()[1]))
  //   .attr("x2", x(sample_mean))
  //   .attr("y2", y(0));

  // svg.append("path")
  //   .datum(normal_curve)
  //   .attr("stroke", "#c4238f")
  //   .attr("stroke-width", 2)
  //   .attr("d", line)
  //   .attr("fill", "none");

  return svg.node();
}
