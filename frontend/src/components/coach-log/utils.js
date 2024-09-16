import axios from "axios";

const getCoacheeList = (teachersBySchool, districtSelected, schoolSelected) => {
  const uniqueTeacherArray = [];
  for (const [key, value] of Object.entries(teachersBySchool)) {
    if (districtSelected === key) {
      for (const [schoolName, teacherList] of Object.entries(value)) {
        if (schoolSelected === schoolName) {
          const uniqueTeacherSet = new Set(teacherList);
          uniqueTeacherArray.push(...uniqueTeacherSet);
        }
      }
    }
  }
  return uniqueTeacherArray;
};

export const getTeacherInfo = (
  setCoacheeList,
  districtSelected,
  schoolSelected
) => {
  let teachersBySchool = {};
  let teacherQuery = `{boards(ids:6197660733){items_page (limit:500) {items {column_values(ids:["short_text_2","coaching_partners","short_text66"]){text column{title}}}}}}`;
  axios.post("/demo/getMonday", { query: teacherQuery }).then((res) => {
    res.data.data.boards[0].items_page.items.forEach((e) => {
      const district = e.column_values.filter((v) => {
        return v.column.title === "District Name";
      })[0].text;
      const school = e.column_values.filter((v) => {
        return v.column.title === "School Name";
      })[0].text;
      const teacherName = e.column_values.filter((v) => {
        return v.column.title === "Coachee";
      })[0].text;
      if (!teachersBySchool[district]) {
        teachersBySchool[district] = { [school]: [teacherName] };
      } else if (
        teachersBySchool[district] &&
        !teachersBySchool[district][school]
      ) {
        teachersBySchool[district][school] = [teacherName];
      } else {
        teachersBySchool[district][school].push(teacherName);
      }
    });
    console.log("teachersBySchool", teachersBySchool);
    const coachees = getCoacheeList(
      teachersBySchool,
      districtSelected,
      schoolSelected
    );
    setCoacheeList(coachees);
  });
};

export const createItem = (query, vars, accessToken) => {
  return (
    axios
      .post("demo/boardUpdate", {
        apiKey: accessToken,
        query: query,
        vars: vars,
      })
      //item id
      .then((res) => res.data.data.create_item.id)
      .catch((err) => err)
  );
};
export const createItemSub = (query, vars, accessToken) => {
  return (
    axios
      .post("/demo/boardUpdate", {
        apiKey: accessToken,
        query: query,
        vars: vars,
      })
      //item id
      .then((res) => res)
      .catch((err) => err)
  );
};

export const uploadFile = (formData, accessToken) => {
  return (
    axios
      .post("/demo/boardFileUpdate", formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      })
      //item id
      .then((res) => res)
      .catch((err) => err)
  );
};
