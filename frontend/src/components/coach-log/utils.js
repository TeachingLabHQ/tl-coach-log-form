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
  let pageCursor = null;
  let teacherQuery = `{boards(ids:6197660733){items_page (limit:500) {cursor items {column_values(ids:["short_text_2","coaching_partners","short_text66"]){text column{title}}}}}}`;
  axios.post("/demo/getMonday", { query: teacherQuery }).then(async (res) => {
    pageCursor = res.data.data.boards[0].items_page.cursor.toString();
    let rawTeacherList = res.data.data.boards[0].items_page.items;
    while (pageCursor) {
      let moreTeacherQuery = `{next_items_page (limit: 500, cursor:"${pageCursor}") {cursor items {column_values(ids:["short_text_2","coaching_partners","short_text66"]){text column{title}}}}}`;
      let moreTeacher = await axios.post("/demo/getMonday", {
        query: moreTeacherQuery,
      });
      rawTeacherList = rawTeacherList.concat(
        moreTeacher.data.data.next_items_page.items
      );
      pageCursor = moreTeacher.data.data.next_items_page.cursor;
    }
    //organize the teacher list by district and school
    rawTeacherList.forEach((e) => {
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
export const NYCGradeLevel = [
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
];
export const NYCSolvesGradeLevel = [
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "Algebra I",
  "Geometry",
  "Algebra II",
];
export const supportedTeachers = [
  "Special Education Teachers",
  " English as New Language or English Language Learner Teachers",
  "None of the above",
];

export const focusOfWork = [
  "1a. Use of instructional materials",
  "1b. Use of research informed instructional practices",
  "2c. Student engagement",
  "2d. Student engagement - K-2 Foundational Skills",
  "2e. Student engagement - K-5 Literacy",
  "3f. Monitoring student learning",
  "4g. Bilingual instructional practices",
];

export const strategiesUsed = [
  "Preparing to Teach - Unpacking curriculum components",
  "Preparing to Teach - Unit/module unpacking",
  "Preparing to Teach - Lesson & unit planning/ preparation/internalization",
  "Preparing to Teach - Collaborative planning & prep for lesson study",
  "Preparing to Teach - Professional learning session",
  "In-Class Support - Side-by-Side coaching",
  "Continuous Improvement - Identifying high-leverage next steps",
  "Continuous Improvement - Student work reflection",
  "Continuous Improvement - Student data analysis",
  "Continuous Improvement - Lesson study reflection",
];

export const supportCycles = {
  "First year of Implementation": [
    "Doing the Math: Lesson Planning",
    "Understanding the Mathematical Progression: Unit Planning",
    "Making the Math Accessible Part 1: Instructional Routines",
    "Synthesizing the Math: Synthesis",
  ],
  "Experienced with Implementation": [
    "Synthesizing the Math: Synthesis",
    "Making the Math Accessible Part 2: Scaffolding",
    "Sustaining the Math: Sustain Teacher-Led Collaboration",
  ],
};

export const primaryStrategyUsed = [
  "Preparing to Teach",
  "In-class support",
  "Professional Learning",
  "Sustaining Teacher-Led Collaboration",
];

export const solvesSpecificStrategyOptions = {
  "Preparing to Teach": [
    "Reviewing student data",
    "Identifying or unpacking key student understandings",
    "Identifying essential learning activities",
    "Identifying resources that provide access for all students",
    "Engage in doing the math together",
  ],
  "In-class support": [
    "Modeling full lesson",
    "Modeling partial lesson",
    "Co-facilitation of lesson",
    "Observation of teacher-facilitated lesson",
  ],
  "Professional Learning": ["Professional Learning"],
  "Sustaining Teacher-Led Collaboration": [
    "Identifying protocols for use in teacher team meetings",
    "Supporting teacher teams to refine and reflect on these protocols",
    "Provisioning support to one or more teachers in the facilitating of the protocols",
    "Supporting the teacher team to reflect on the process",
    "Working with school administration to ensure school systems and structures support regular teacher teamwork",
  ],
};

export const nycSchoolLeaders = [
  "Principal",
  "Assistant principal",
  "School-based coach",
  "District-based staff",
  "Other",
];

export const nycReadsPrimaryFocus = [
  "Leadership team collaboration",
  "Year-long implementation plans",
  "Programming & use of school time",
  "Curriculum-based instruction capacity building",
  "Capacity building on job-embedded supports",
  "Shared learning walks",
  "Developing teacher teams",
];
