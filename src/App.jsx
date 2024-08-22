import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

import './App.css';

function App() {
  const fourGroup = 9;
  const labelsFour = Array.from({ length: 5 }, (_, i) => i + 1);
  const fiveGroup = 19;
  const labelsFive = Array.from({ length: 5 }, (_, i) => i + 1);


  const generateFakeUserData = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    birthday_user: faker.date.past({ years: 30, refDate: new Date(2003, 0, 1) }).toISOString().split('T')[0], // Adjust date range as needed
    sex: faker.person.gender(),
    phone: faker.phone.number()
  });

  const [isCopied, setIsCopied] = useState(false);


  const [selectedJob, setSelectedJob] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [selectHome, setSelectHome] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedValues4, setSelectedValues4] = useState(
    Array.from({ length: fourGroup }, () => '')
  );
  const [selectedValues5, setSelectedValues5] = useState(
    Array.from({ length: fiveGroup }, () => '')
  );
  const [sqlOutput, setSqlOutput] = useState('');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCheckboxes(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };



  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSelectedSalary(event.target.value);
  };

  const handleChangeJob = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleCompanionChange = (event) => {
    setSelectedCompanion(event.target.value);
  };

  const handleChangeCar = (event) => {
    setSelectedCar(event.target.value);
  }

  const handleChangeHome = (event) => {
    setSelectHome(event.target.value);
  }

  const handleBudgetChange = (event) => {
    setSelectedBudget(event.target.value);
  };

  const handleChangeAge = (event) => {
    setSelectedAge(event.target.value);
  };

  const handleChange4 = (index) => (event) => {
    const newSelectedValues = [...selectedValues4];
    newSelectedValues[index] = event.target.value;
    setSelectedValues4(newSelectedValues);
  };

  const handleChange5 = (index) => (event) => {
    const newSelectedValues = [...selectedValues5];
    newSelectedValues[index] = event.target.value;
    setSelectedValues5(newSelectedValues);
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlOutput)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset color after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
      });
  };


  const checkBeforeSubmit = () => {

    if (Object.values(selectedCheckboxes).every(value => value === false)) {
      return true;
    }

    if (selectedGender === '') {
      return true;
    }

    if (selectedJob === '') {
      return true;
    }

    if (selectedSalary === '') {
      return true;
    }

    if (selectedCompanion === '') {
      return true;
    }

    if (selectedCar === '') {
      return true;
    }

    if (selectHome === '') {
      return true;
    }

    if (selectedValues4.some(value => value === '')) {
      return true;
    }

    if (selectedValues5.some(value => value === '')) {
      return true;
    }

    if (selectedBudget === '') {
      return true;
    }

    return false;
  }


  const generateSQL = () => {
    const newUserData = generateFakeUserData();

    // Generate a random ID between 1000 and 5000
    const id_member = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    const sqlInsert = `INSERT INTO member (\`id_member\`, \`email\`, \`pass\`, \`username\`, \`birthday_user\`, \`sex\`, \`phone\`, \`Status\`)
      VALUES (${id_member}, '${newUserData.email}', '${newUserData.password}', '${newUserData.username}', '${newUserData.birthday_user}', '1', '0000000000', '0');`;

    const checkboxValues = Object.values(selectedCheckboxes)
      .map(value => value ? 1 : 0) // Convert boolean to 1 or 0
      .concat(new Array(8).fill(0)) // Ensure there are at least 8 elements
      .slice(0, 8); // Trim to exactly 8 elements

    const [ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8] = checkboxValues;

    const sqlUpdateSection1 = `INSERT INTO ans_interest (\`id_member\`, \`ans1\`, \`ans2\`, \`ans3\`, \`ans4\`, \`ans5\`, \`ans6\`, \`ans7\`, \`ans8\`)
      VALUES (${id_member}, '${ans1}', '${ans2}', '${ans3}', '${ans4}', '${ans5}', '${ans6}', '${ans7}', '${ans8}');`;

    const genderMapping = {
      male: 1,
      female: 2,
      lgbtq: 3,
      not_specified: 4,
    };

    const ageMapping = {
      '12-18': 1,
      '19-40': 2,
      '41-60': 3,
      '60+': 4,
    };

    const jobMapping = {
      business_owner: 1,
      official: 2,
      company_employee: 3,
      private_employee: 4,
      student: 5,
      anotherJob: 6,
    };

    const salaryMapping = {
      below_5k: 1,
      '5k-10k': 2,
      '10k-20k': 3,
      '20k-30k': 4,
      '30k-40k': 5,
      upper_40k: 6,
    };

    const companionMapping = {
      backpacker: 1,
      couple: 2,
      friend: 3,
      family: 4,
    };

    const carMapping = {
      car: 1,
      public_transport: 2,
      motorcycle: 3,
      rental: 4,
      anotherCar: 5,
    };

    const homeMapping = {
      hotel: 1,
      autayan: 2,
      resort: 3,
      homeStay: 4,
      privateHome: 5,
      anotherHome: 6,
    };

    const budgetMapping = {
      below_1000: 1,
      '1000-2000': 2,
      '2000-3000': 3,
      '3000-4000': 4,
      more_4000: 5,
    };

    // Extract mapped values or default to 0
    const ans_form1 = genderMapping[selectedGender] || 0;
    const ans_form2 = ageMapping[selectedAge] || 0;
    const ans_form3 = jobMapping[selectedJob] || 0;
    const ans_form4 = salaryMapping[selectedSalary] || 0;
    const ans_form5 = companionMapping[selectedCompanion] || 0;
    const ans_form6 = carMapping[selectedCar] || 0;
    const ans_form7 = homeMapping[selectHome] || 0;
    const ans_form8 = budgetMapping[selectedBudget] || 0;

    const sqlUpdateSection2 = `INSERT INTO form_member (\`id_member\`, \`ans_form1\`, \`ans_form2\`, \`ans_form3\`, \`ans_form4\`, \`ans_form5\`, \`ans_form6\`, \`ans_form7\`, \`ans_form8\`)
      VALUES (${id_member}, ${ans_form1}, ${ans_form2}, ${ans_form3}, ${ans_form4}, ${ans_form5}, ${ans_form6}, ${ans_form7}, ${ans_form8});`;


    // make map with if selectedValues4[0] === 12 make it 2 , if selectedValues4[0] === 13 make it 3
    const map4 = {
      11: 1, 12: 2, 13: 3, 14: 4, 15: 5,
      21: 1, 22: 2, 23: 3, 24: 4, 25: 5,
      31: 1, 32: 2, 33: 3, 34: 4, 35: 5,
      41: 1, 42: 2, 43: 3, 44: 4, 45: 5,
      51: 1, 52: 2, 53: 3, 54: 4, 55: 5,
      61: 1, 62: 2, 63: 3, 64: 4, 65: 5,
      71: 1, 72: 2, 73: 3, 74: 4, 75: 5,
      81: 1, 82: 2, 83: 3, 84: 4, 85: 5,
      91: 1, 92: 2, 93: 3, 94: 4, 95: 5,
    };

    const eva_p1_ans1 = map4[selectedValues4[0]] || 0;
    const eva_p1_ans2 = map4[selectedValues4[1]] || 0;
    const eva_p1_ans3 = map4[selectedValues4[2]] || 0;
    const eva_p1_ans4 = map4[selectedValues4[3]] || 0;
    const eva_p1_ans5 = map4[selectedValues4[4]] || 0;
    const eva_p1_ans6 = map4[selectedValues4[5]] || 0;
    const eva_p1_ans7 = map4[selectedValues4[6]] || 0;
    const eva_p1_ans8 = map4[selectedValues4[7]] || 0;
    const eva_p1_ans9 = map4[selectedValues4[8]] || 0;


    const sqlUpdateSection3 = `
    INSERT INTO eva_form1 (
      id_member, eva_p1_ans1, eva_p1_ans2, eva_p1_ans3, eva_p1_ans4, eva_p1_ans5, eva_p1_ans6, eva_p1_ans7, eva_p1_ans8, eva_p1_ans9) VALUES (
      ${id_member}, ${eva_p1_ans1}, ${eva_p1_ans2}, ${eva_p1_ans3}, ${eva_p1_ans4}, ${eva_p1_ans5}, ${eva_p1_ans6}, ${eva_p1_ans7}, ${eva_p1_ans8}, ${eva_p1_ans9}
    );`;

    const map5 = {
      11: 1, 12: 2, 13: 3, 14: 4, 15: 5,
      21: 1, 22: 2, 23: 3, 24: 4, 25: 5,
      31: 1, 32: 2, 33: 3, 34: 4, 35: 5,
      41: 1, 42: 2, 43: 3, 44: 4, 45: 5,
      51: 1, 52: 2, 53: 3, 54: 4, 55: 5,
      61: 1, 62: 2, 63: 3, 64: 4, 65: 5,
      71: 1, 72: 2, 73: 3, 74: 4, 75: 5,
      81: 1, 82: 2, 83: 3, 84: 4, 85: 5,
      91: 1, 92: 2, 93: 3, 94: 4, 95: 5,
      101: 1, 102: 2, 103: 3, 104: 4, 105: 5,
      111: 1, 112: 2, 113: 3, 114: 4, 115: 5,
      121: 1, 122: 2, 123: 3, 124: 4, 125: 5,
      131: 1, 132: 2, 133: 3, 134: 4, 135: 5,
      141: 1, 142: 2, 143: 3, 144: 4, 145: 5,
      151: 1, 152: 2, 153: 3, 154: 4, 155: 5,
      161: 1, 162: 2, 163: 3, 164: 4, 165: 5,
      171: 1, 172: 2, 173: 3, 174: 4, 175: 5,
      181: 1, 182: 2, 183: 3, 184: 4, 185: 5,
      191: 1, 192: 2, 193: 3, 194: 4, 195: 5,
    };

    const eva_p2_ans1 = map5[selectedValues5[0]] || 0;
    const eva_p2_ans2 = map5[selectedValues5[1]] || 0;
    const eva_p2_ans3 = map5[selectedValues5[2]] || 0;
    const eva_p2_ans4 = map5[selectedValues5[3]] || 0;
    const eva_p2_ans5 = map5[selectedValues5[4]] || 0;
    const eva_p2_ans6 = map5[selectedValues5[5]] || 0;
    const eva_p2_ans7 = map5[selectedValues5[6]] || 0;
    const eva_p2_ans8 = map5[selectedValues5[7]] || 0;
    const eva_p2_ans9 = map5[selectedValues5[8]] || 0;
    const eva_p2_ans10 = map5[selectedValues5[9]] || 0;
    const eva_p2_ans11 = map5[selectedValues5[10]] || 0;
    const eva_p2_ans12 = map5[selectedValues5[11]] || 0;
    const eva_p2_ans13 = map5[selectedValues5[12]] || 0;
    const eva_p2_ans14 = map5[selectedValues5[13]] || 0;
    const eva_p2_ans15 = map5[selectedValues5[14]] || 0;
    const eva_p2_ans16 = map5[selectedValues5[15]] || 0;
    const eva_p2_ans17 = map5[selectedValues5[16]] || 0;
    const eva_p2_ans18 = map5[selectedValues5[17]] || 0;
    const eva_p2_ans19 = map5[selectedValues5[18]] || 0;

    const sqlUpdateSection4 = `
    INSERT INTO eva_form2 (
      id_member, eva_p2_ans1, eva_p2_ans2, eva_p2_ans3, eva_p2_ans4, eva_p2_ans5, eva_p2_ans6, eva_p2_ans7, eva_p2_ans8, eva_p2_ans9, eva_p2_ans10, eva_p2_ans11, eva_p2_ans12, eva_p2_ans13, eva_p2_ans14, eva_p2_ans15, eva_p2_ans16, eva_p2_ans17, eva_p2_ans18, eva_p2_ans19) VALUES (
      ${id_member}, ${eva_p2_ans1}, ${eva_p2_ans2}, ${eva_p2_ans3}, ${eva_p2_ans4}, ${eva_p2_ans5}, ${eva_p2_ans6}, ${eva_p2_ans7}, ${eva_p2_ans8}, ${eva_p2_ans9}, ${eva_p2_ans10}, ${eva_p2_ans11}, ${eva_p2_ans12}, ${eva_p2_ans13}, ${eva_p2_ans14}, ${eva_p2_ans15}, ${eva_p2_ans16}, ${eva_p2_ans17}, ${eva_p2_ans18}, ${eva_p2_ans19}
    );`;


    // Concatenate SQL statements
    const fullSQL = `${sqlInsert}\n${sqlUpdateSection1}\n${sqlUpdateSection2}\n${sqlUpdateSection3}\n${sqlUpdateSection4}`;

    setSqlOutput(fullSQL);
  };



  return (
    <>
      <Typography sx={{ fontSize: "30px" }}>
        แบบสัมภาษณ์
      </Typography>

      <Typography sx={{ fontSize: "15px" }}>
        เรื่อง แบบสัมภาษณ์สําหรับนักท่องเที่ยวและบุคคลทั่วไปที่เกี่ยวข้องกับการท่องเที่ยวเพื่อเก็บข้อมูลสําหรับระบบแนะนําสถานที่ท่องเที่ยวรายบุคลโดยใช้เทคนิคการจัดกลุ่มและกระบวนการลําดับชั้นเชิงวิเคราะห์
      </Typography>

      <Typography sx={{ fontSize: "20px", mt: "100px" }}>
        ตอนที่ 1 ความสนใจในการท่องเที่ยวเบื้องต้น
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content'
        }}
      >
        <FormControlLabel
          control={<Checkbox
            name="ecotourism"
            checked={selectedCheckboxes.ecotourism || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงนิเวศ/ธรรมชาติ</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="foodtourism"
            checked={selectedCheckboxes.foodtourism || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงอาหาร</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="festival"
            checked={selectedCheckboxes.festival || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงเทศกาล/งานประเพณี</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="agriculture"
            checked={selectedCheckboxes.agriculture || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงเกษตร</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="cultural"
            checked={selectedCheckboxes.cultural || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยววัฒนธรรม/วิถีชีวิต</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="adventure"
            checked={selectedCheckboxes.adventure || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงผจญภัย</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="health"
            checked={selectedCheckboxes.health || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงสุขภาพ</Typography>}
        />
        <FormControlLabel
          control={<Checkbox
            name="religion"
            checked={selectedCheckboxes.religion || false}
            onChange={handleCheckboxChange}
          />}
          label={<Typography sx={{ fontSize: "15px" }}>แหล่งท่องเที่ยวเชิงศาสนา</Typography>}
        />
      </Box>
      <Typography sx={{ fontSize: "20px", mt: "100px" }}>
        ตอนที่ 2 ข้อมูลส่วนตัว
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px'
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          เพศ :
        </Typography>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={selectedGender} // Set the value to the state
          onChange={handleGenderChange} // Handle changes
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ชาย</Typography>}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>หญิง</Typography>}
          />
          <FormControlLabel
            value="lgbtq"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>LGBTQ+</Typography>}
          />
          <FormControlLabel
            value="not_specified"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ไม่ต้องการระบุ</Typography>}
          />
        </RadioGroup>
      </Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', /* Center items vertically */
          justifyContent: 'space-between', /* Space items evenly */
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px' /* Space between each radio-button-text pair */
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          อายุ :
        </Typography>
        <RadioGroup
          aria-label="age"
          name="age"
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} // Space between each radio button
          value={selectedAge}
          onChange={handleChangeAge}
        >
          <FormControlLabel
            value="12-18"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>12-18 ปี</Typography>}
          />
          <FormControlLabel
            value="19-40"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>19-40 ปี</Typography>}
          />

          <FormControlLabel
            value="41-60 ปี"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>41-60 ปี</Typography>}
          />
          <FormControlLabel
            value="60+"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>มากกว่า 60 ปี</Typography>}
          />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', /* Center items vertically */
          justifyContent: 'space-between', /* Space items evenly */
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px' /* Space between each radio-button-text pair */
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          อาชีพ :
        </Typography>
        <RadioGroup
          aria-label="job"
          name="job"
          value={selectedJob}
          onChange={handleChangeJob}
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} // Space between each radio button
        >
          <FormControlLabel
            value="business_owner"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>เจ้าของกิจการ</Typography>}
          />
          <FormControlLabel
            value="official"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ข้าราชการ</Typography>}
          />
          <FormControlLabel
            value="company_employee"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>พนักงานบริษัท</Typography>}
          />
          <FormControlLabel
            value="private_employee"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>พนักงานเอกชน</Typography>}
          />
          <FormControlLabel
            value="student"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>นักเรียน/นักศึกษา</Typography>}
          />
          <FormControlLabel
            value="anotherJob"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>อื่นๆ</Typography>}
          />
        </RadioGroup>
        {selectedJob === 'anotherJob' && (
          <TextField
            label="ระบุอาชีพอื่นๆ"
            variant="outlined"
            sx={{ mt: "10px" }} // Add margin top for spacing
          />
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px'
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          รายได้ต่อเดือน :
        </Typography>
        <RadioGroup
          aria-label="salary"
          name="salary"
          value={selectedSalary} // Set the value to the state
          onChange={handleSalaryChange} // Handle changes
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
        >
          <FormControlLabel
            value="below_5k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ต่ำกว่า 5,000 บาท</Typography>}
          />
          <FormControlLabel
            value="5k-10k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>5,001 - 10,000 บาท</Typography>}
          />
          <FormControlLabel
            value="10k-20k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>10,001 - 20,000 บาท</Typography>}
          />
          <FormControlLabel
            value="20k-30k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>20,001 - 30,000 บาท</Typography>}
          />
          <FormControlLabel
            value="30k-40k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>30,001 - 40,000 บาท</Typography>}
          />
          <FormControlLabel
            value="upper_40k"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>40,001 บาทขึ้นไป</Typography>}
          />
        </RadioGroup>
      </Box>

      <Typography sx={{ fontSize: "20px", mt: "100px" }}>
        ตอนที่ 3  พฤติกรรมการท่องเที่ยวของนักท่องเที่ยว
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px'
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          เดินทางท่องเที่ยวกับใคร :
        </Typography>
        <RadioGroup
          aria-label="who"
          name="who"
          value={selectedCompanion} // Set the value to the state
          onChange={handleCompanionChange} // Handle changes
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
        >
          <FormControlLabel
            value="backpacker"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>คนเดียว</Typography>}
          />
          <FormControlLabel
            value="couple"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>คนรัก</Typography>}
          />
          <FormControlLabel
            value="friend"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>เพื่อน</Typography>}
          />
          <FormControlLabel
            value="family"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ครอบครัว</Typography>}
          />
        </RadioGroup>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', /* Center items vertically */
          justifyContent: 'space-between', /* Space items evenly */
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px' /* Space between each radio-button-text pair */
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          เดินทางท่องเที่ยวโดยยานพาหนะใด :
        </Typography>
        <RadioGroup
          aria-label="car"
          name="car"
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} // Space between each radio button
          onChange={handleChangeCar}
          value={selectedCar}
        >
          <FormControlLabel
            value={"car"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>รถยนต์</Typography>}
          />
          <FormControlLabel
            value={"public_transport"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>รถสาธารณะ</Typography>}
          />
          <FormControlLabel
            value={"motorcycle"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>รถจักรยานยนต์</Typography>}
          />
          <FormControlLabel
            value={"rental"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>เช่ารถ</Typography>}
          />
          <FormControlLabel
            value={"anotherCar"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>อื่นๆ</Typography>}
          />

          {selectedCar === 'anotherCar' && (
            <TextField
              label="ระบุยานพาหนะ"
              variant="outlined"
              sx={{ mt: "10px" }} // Add margin top for spacing
            />
          )}
        </RadioGroup>
      </Box >


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', /* Center items vertically */
          justifyContent: 'space-between', /* Space items evenly */
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px' /* Space between each radio-button-text pair */
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          ในการท่องเที่ยวเลือกที่พักแบบใด :
        </Typography>
        <RadioGroup
          aria-label="car"
          name="car"
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }} // Space between each radio button
          onChange={handleChangeHome}
          value={selectHome}
        >
          <FormControlLabel
            value={"hotel"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>โรงแรม</Typography>}
          />
          <FormControlLabel
            value={"autayan"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>วนอุทยาน</Typography>}
          />
          <FormControlLabel
            value={"resort"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>รีสอร์ท</Typography>}
          />
          <FormControlLabel
            value={"homeStay"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>โฮมสเตย์</Typography>}
          />
          <FormControlLabel
            value={"privateHome"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>บ้านพักส่วนตัว</Typography>}
          />


          <FormControlLabel
            value={"anotherHome"}
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>อื่นๆ</Typography>}
          />

          {selectHome === 'anotherHome' && (
            <TextField
              label="ระบุที่พัก"
              variant="outlined"
              sx={{ mt: "10px" }} // Add margin top for spacing
            />
          )}
        </RadioGroup>
      </Box >


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '0 auto',
          mt: "20px",
          width: 'fit-content',
          gap: '20px'
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          งบประมาณที่ใช้ในการท่องเที่ยวต่อวัน :
        </Typography>
        <RadioGroup
          aria-label="budget"
          name="budget"
          value={selectedBudget} // Set the value to the state
          onChange={handleBudgetChange} // Handle changes
          sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
        >
          <FormControlLabel
            value="below_1000"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>ต่ำกว่า 1,000 บาท</Typography>}
          />
          <FormControlLabel
            value="1000-2000"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>1,001 - 2,000 บาท</Typography>}
          />
          <FormControlLabel
            value="2000-3000"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>2,001 - 3,000 บาท</Typography>}
          />
          <FormControlLabel
            value="3000-4000"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>3,001 - 4,000 บาท</Typography>}
          />
          <FormControlLabel
            value="more_4000"
            control={<Radio />}
            label={<Typography sx={{ fontSize: "15px" }}>4,001 บาทขึ้นไป</Typography>}
          />
        </RadioGroup>
      </Box>

      <Typography sx={{ fontSize: "20px", mt: "100px" }}>
        ตอนที่ 4 แรงจูงใจในการท่องเที่ยวของท่าน
      </Typography>

      <Typography sx={{ fontSize: "15px" }}>
        ท่านเดินทางท่องเที่ยวเพราะ : ระดับคะแนน 1-5 โดย 1 คือ ไม่สนใจเลย และ 5 คือ สนใจมากที่สุด
      </Typography>

      <div>
        {Array.from({ length: fourGroup }, (_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 auto',
              mt: "20px",
              width: 'fit-content',
              gap: '20px'
            }}
          >
            <Typography sx={{ fontSize: "15px" }}>
              {index + 1} :
            </Typography>
            <RadioGroup
              aria-label={`${index + 1}`}
              name={`${index + 1}`}
              value={selectedValues4[index]} // Set the value to the state for this group
              onChange={handleChange4(index)} // Handle changes
              sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
            >
              {labelsFour.map((label) => (
                <FormControlLabel
                  key={`${index + 1}-${label}`}
                  value={`${index + 1}${label}`}
                  control={<Radio />}
                  label={<Typography sx={{ fontSize: "15px" }}>{label}</Typography>}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </div>


      <Typography sx={{ fontSize: "20px", mt: "100px" }}>
        ตอนที่ 5 องค์ประกอบการท่องเที่ยวที่มีอิทธิพลต่อการตัดสินใจท่องเที่ยว
      </Typography>

      <Typography sx={{ fontSize: "15px" }}>
        ท่านตัดสินใจเลือกเดินทางท่องเที่ยวเพราะเหตุใดมากที่สุด : ระดับคะแนน 1-5 โดย 1 คือ ไม่เห็นด้วยเลย และ 5 คือ เห็นด้วยมากที่สุด
      </Typography>

      <div>
        {Array.from({ length: fiveGroup }, (_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 auto',
              mt: "20px",
              width: 'fit-content',
              gap: '20px'
            }}
          >
            <Typography sx={{ fontSize: "15px" }}>
              {index + 1} :
            </Typography>
            <RadioGroup
              aria-label={`${index + 1}`}
              name={`${index + 1}`}
              value={selectedValues5[index]} // Set the value to the state for this group
              onChange={handleChange5(index)} // Handle changes
              sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}
            >
              {labelsFive.map((label) => (
                <FormControlLabel
                  key={`${index + 1}-${label}`}
                  value={`${index + 1}${label}`}
                  control={<Radio />}
                  label={<Typography sx={{ fontSize: "15px" }}>{label}</Typography>}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </div>


      {/* button to submit form */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // Center items vertically
          justifyContent: 'center', // Center items horizontally
          margin: '0 auto', // Center the box horizontally
          mt: "50px", // Add margin top for spacing
        }}
      >
        <Button variant="contained"
          disabled={checkBeforeSubmit()}
          onClick={() => generateSQL()}
        >
          Generate SQL
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          margin: '0 auto',
          mt: "20px",
          width: '50%',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 'bold', mb: 1 }}>
          SQL Output
        </Typography>
        <Typography sx={{ fontSize: "14px", mb: 1 }}>
          {sqlOutput}
        </Typography>
        <Button
          variant="contained"
          onClick={copyToClipboard}
          sx={{
            alignSelf: 'flex-end',
            backgroundColor: isCopied ? '#97cbff' : '#1976d2', // Custom color based on state
            color: '#fff', // Ensure text color is readable on the background
          }}
          disabled={sqlOutput === ''}
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </Button>
      </Box>

    </>
  );
}

export default App;
