// 姓名库：真实常见姓名组合（手工五国专属池 + 七大地区池）
// 手工池：中国/印度/美国/印尼/巴基斯坦；地区池按世行地区组匹配生成国

import { COUNTRIES } from './countries.js';

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

// ── 地区池（生成国按地区组匹配）──
const EAS_M = ['Yuto', 'Haruto', 'Minjun', 'Jihoon', 'Wei', 'Hao', 'Long', 'Nam', 'Khanh', 'Tuan', 'Ren', 'Daiki', 'Seungmin', 'Chen', 'Jian', 'Kaito', 'Minh', 'Donghyuck'];
const EAS_F = ['Sakura', 'Yui', 'Jiwoo', 'Seoyeon', 'Mei', 'Ling', 'Xia', 'Lien', 'Mai', 'Hana', 'Sora', 'Yuna', 'Thanh', 'Lan', 'Chunja', 'Aoi', 'Nhi', 'Bora'];
const EAS_S = ['Tanaka', 'Kim', 'Nguyen', 'Chen', 'Wang', 'Li', 'Park', 'Tran', 'Le', 'Pham', 'Sato', 'Liu', 'Yang', 'Hoang', 'Choi', 'Wu', 'Do', 'Jung'];

const SSF_M = ['Kwame', 'Chukwu', 'Emeka', 'Kofi', 'Tunde', 'Musa', 'Jean', 'Ibrahima', 'Abebe', 'Kelechi', 'Thabo', 'Amadou', 'Yosef', 'Sipho', 'Mamadou', 'Ousmane', 'Dawit', 'Bongani'];
const SSF_F = ['Ama', 'Ngozi', 'Amina', 'Fatou', 'Adaeze', 'Aisha', 'Marie', 'Abeba', 'Thandiwe', 'Chiamaka', 'Kadiatou', 'Zenebe', 'Lindiwe', 'Mariama', 'Hanna', 'Yewande', 'Folasade', 'Nia'];
const SSF_S = ['Okafor', 'Mensah', 'Diallo', 'Abebe', 'Njoroge', 'Traore', 'Osei', 'Mwangi', 'Dlamini', 'Camara', 'Tesfaye', 'Adeyemi', 'Mbeki', 'Sow', 'Keita', 'Onyango', 'Haile', 'Mutua'];

const LCN_M = ['Carlos', 'Jose', 'Juan', 'Luis', 'Pedro', 'Diego', 'Miguel', 'Rafael', 'Gabriel', 'Andres', 'Mateo', 'Santiago', 'Joao', 'Bruno', 'Felipe', 'Ricardo', 'Alejandro', 'Lucas'];
const LCN_F = ['Maria', 'Ana', 'Sofia', 'Lucia', 'Carla', 'Valentina', 'Camila', 'Isabela', 'Fernanda', 'Gabriela', 'Luisa', 'Mariana', 'Paula', 'Daniela', 'Rosa', 'Elena', 'Julia', 'Beatriz'];
const LCN_S = ['Garcia', 'Rodriguez', 'Martinez', 'Silva', 'Santos', 'Lopez', 'Gonzalez', 'Perez', 'Fernandez', 'Costa', 'Souza', 'Rivera', 'Torres', 'Ramirez', 'Flores', 'Moraes', 'Vargas', 'Castro'];

const ECS_M = ['Ivan', 'Dmitri', 'Piotr', 'Lukas', 'Marek', 'Andrei', 'Stefan', 'Milan', 'Tomas', 'Nikolai', 'Pavel', 'Jan', 'Emil', 'Vlad', 'Boris', 'Petr', 'Sergei', 'Marko'];
const ECS_F = ['Anna', 'Elena', 'Olga', 'Maria', 'Ivana', 'Katarina', 'Natasha', 'Vera', 'Petra', 'Darya', 'Lucia', 'Marketa', 'Sofia', 'Eva', 'Zuzana', 'Irena', 'Tatiana', 'Alena'];
const ECS_S = ['Ivanov', 'Kovacs', 'Novak', 'Petrov', 'Horvat', 'Kowalski', 'Popescu', 'Sokolov', 'Volkov', 'Nagy', 'Dimitrov', 'Svoboda', 'Kuznetsov', 'Toth', 'Ionescu', 'Cerny', 'Molnar', 'Kral'];

const MENA_M = ['Omar', 'Khalid', 'Youssef', 'Mehmet', 'Karim', 'Tarek', 'Hassan', 'Ahmad', 'Samir', 'Mustafa', 'Ibrahim', 'Nasser', 'Faisal', 'Rami', 'Kamal', 'Walid', 'Jamal', 'Adnan'];
const MENA_F = ['Layla', 'Noor', 'Salma', 'Amira', 'Yasmin', 'Hoda', 'Rania', 'Dalia', 'Mona', 'Farah', 'Zahra', 'Nadia', 'Rana', 'Samar', 'Lina', 'Hana', 'Maha', 'Reem'];
const MENA_S = ['Al-Farsi', 'Haddad', 'Yilmaz', 'Mansour', 'Nasser', 'Khalil', 'Aziz', 'Saleh', 'Rahman', 'Demir', 'Ozturk', 'Shahin', 'Farouk', 'Habib', 'Amin', 'Zayd', 'Qasim', 'Barakat'];

const NAC_M = US_MALE_FIRST;
const NAC_F = US_FEMALE_FIRST;
const NAC_S = US_SURNAMES;

const POOLS = {
  eas: { m: EAS_M, f: EAS_F, s: EAS_S },
  sas: { m: IN_MALE_FIRST, f: IN_FEMALE_FIRST, s: IN_SURNAMES },
  ssf: { m: SSF_M, f: SSF_F, s: SSF_S },
  lcn: { m: LCN_M, f: LCN_F, s: LCN_S },
  ecs: { m: ECS_M, f: ECS_F, s: ECS_S },
  mena: { m: MENA_M, f: MENA_F, s: MENA_S },
  nac: { m: NAC_M, f: NAC_F, s: NAC_S },
};

// id → 池映射（手工国专属，生成国按 namePool 字段）
const ID_POOL = { china: 'cn', india: 'in', usa: 'nac', indonesia: 'idn', pakistan: 'pk' };

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
  // 生成国兜底：按地区池组合（名+姓）
  const poolKey = COUNTRIES[country]?.namePool || 'nac';
  const pool = POOLS[poolKey] || POOLS.nac;
  const first = pick(rng, gender === 'male' ? pool.m : pool.f);
  return first + ' ' + pick(rng, pool.s);
}

// 家人姓名（父母、兄弟姐妹、配偶、子女）
export function genFamilyName(rng, country, gender) {
  return genName(rng, country, gender);
}
