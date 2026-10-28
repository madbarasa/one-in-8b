// 姓名库：真实常见姓名组合（公开常识数据，MVP 覆盖中印两国）

const CN_SURNAMES = ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '林', '罗', '郑'];
const CN_MALE_GIVEN = ['伟', '强', '磊', '军', '洋', '勇', '杰', '涛', '明', '超', '浩', '宇', '子轩', '浩然', '雨轩', '博文', '思远', '志强', '建国', '文博'];
const CN_FEMALE_GIVEN = ['芳', '娟', '敏', '静', '丽', '婷', '雪', '欣怡', '雨桐', '梦琪', '思颖', '佳琪', '晓燕', '淑兰', '桂英', '秀英', '玉兰', '静怡', '美玲', '雅琴'];

const IN_MALE_FIRST = ['Ravi', 'Amit', 'Rajesh', 'Sunil', 'Anil', 'Vikram', 'Rahul', 'Arjun', 'Deepak', 'Manoj', 'Suresh', 'Gaurav', 'Rohit', 'Sanjay', 'Ashok', 'Prakash', 'Nitin', 'Vijay'];
const IN_FEMALE_FIRST = ['Sunita', 'Savitri', 'Priya', 'Anita', 'Kavita', 'Rekha', 'Anjali', 'Pooja', 'Neha', 'Lakshmi', 'Meena', 'Shanti', 'Geeta', 'Ritu', 'Sarita', 'Divya'];
const IN_SURNAMES = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Das', 'Gupta', 'Reddy', 'Joshi', 'Verma', 'Mehta', 'Agarwal', 'Nair', 'Chauhan', 'Pandey', 'Yadav'];

const US_MALE_FIRST = ['James', 'Michael', 'Robert', 'John', 'David', 'Daniel', 'Matthew', 'Christopher', 'Andrew', 'Joshua', 'Ethan', 'Ryan', 'Tyler', 'Jacob', 'Noah', 'Liam', 'Mason', 'Logan'];
const US_FEMALE_FIRST = ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Emily', 'Madison', 'Abigail', 'Jessica', 'Ashley', 'Sarah', 'Ava', 'Mia', 'Grace', 'Chloe', 'Hannah', 'Lily', 'Natalie', 'Zoe'];
const US_SURNAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Lee', 'Walker', 'Hall'];

const IDN_MALE_FIRST = ['Budi', 'Agus', 'Asep', 'Joko', 'Rizky', 'Dedi', 'Eko', 'Surya', 'Andi', 'Bayu', 'Dimas', 'Fajar', 'Hendra', 'Iwan', 'Yusuf', 'Adi', 'Gunawan', 'Teguh'];
const IDN_FEMALE_FIRST = ['Siti', 'Dewi', 'Ani', 'Rina', 'Putri', 'Sri', 'Fitri', 'Indah', 'Maya', 'Nurul', 'Ayu', 'Ratna', 'Wulan', 'Yuni', 'Lestari', 'Novi', 'Rahma', 'Intan'];
const IDN_SURNAMES = ['Santoso', 'Wijaya', 'Kusuma', 'Hartono', 'Pratama', 'Saputra', 'Setiawan', 'Nugroho', 'Wibowo', 'Halim', 'Tanjung', 'Siregar', 'Simanjuntak', 'Ginting', 'Nasution', 'Rahman', 'Iskandar', 'Maulana'];

const PK_MALE_FIRST = ['Muhammad', 'Ali', 'Hassan', 'Hussain', 'Ahmed', 'Usman', 'Bilal', 'Hamza', 'Zain', 'Faisal', 'Imran', 'Kashif', 'Junaid', 'Shahid', 'Tariq', 'Asif', 'Rashid', 'Naveed'];
const PK_FEMALE_FIRST = ['Ayesha', 'Fatima', 'Zainab', 'Maryam', 'Hafsa', 'Amna', 'Sana', 'Hina', 'Iqra', 'Areeba', 'Bushra', 'Rabia', 'Sadia', 'Nimra', 'Laiba', 'Eman', 'Kiran', 'Saima'];
const PK_SURNAMES = ['Khan', 'Ahmed', 'Raza', 'Hussain', 'Malik', 'Chaudhry', 'Butt', 'Sheikh', 'Baig', 'Qureshi', 'Farooq', 'Siddiqui', 'Abbasi', 'Awan', 'Gondal', 'Bhatti', 'Nawaz', 'Mehmood'];

const pick = (rng, arr) => arr[rng.int(0, arr.length)];

export function genName(rng, country, gender) {
  if (country === 'china') {
    const surname = pick(rng, CN_SURNAMES);
    const given = pick(rng, gender === 'male' ? CN_MALE_GIVEN : CN_FEMALE_GIVEN);
    return surname + given;
  }
  if (country === 'india') {
    const first = pick(rng, gender === 'male' ? IN_MALE_FIRST : IN_FEMALE_FIRST);
    return first + ' ' + pick(rng, IN_SURNAMES);
  }
  if (country === 'usa') {
    const first = pick(rng, gender === 'male' ? US_MALE_FIRST : US_FEMALE_FIRST);
    return first + ' ' + pick(rng, US_SURNAMES);
  }
  if (country === 'indonesia') {
    const first = pick(rng, gender === 'male' ? IDN_MALE_FIRST : IDN_FEMALE_FIRST);
    const second = pick(rng, gender === 'male' ? IDN_MALE_FIRST : IDN_FEMALE_FIRST);
    return first === second ? first + ' ' + pick(rng, IDN_SURNAMES) : first + ' ' + second;
  }
  if (country === 'pakistan') {
    const first = pick(rng, gender === 'male' ? PK_MALE_FIRST : PK_FEMALE_FIRST);
    return first + ' ' + pick(rng, PK_SURNAMES);
  }
  throw new Error(`未支持的国家姓名库: ${country}`);
}

// 家人姓名（父母、兄弟姐妹、配偶、子女）
export function genFamilyName(rng, country, gender) {
  return genName(rng, country, gender);
}
