// 姓名库：真实常见姓名组合（公开常识数据，MVP 覆盖中印两国）

const CN_SURNAMES = ['王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周', '徐', '孙', '马', '朱', '胡', '郭', '何', '林', '罗', '郑'];
const CN_MALE_GIVEN = ['伟', '强', '磊', '军', '洋', '勇', '杰', '涛', '明', '超', '浩', '宇', '子轩', '浩然', '雨轩', '博文', '思远', '志强', '建国', '文博'];
const CN_FEMALE_GIVEN = ['芳', '娟', '敏', '静', '丽', '婷', '雪', '欣怡', '雨桐', '梦琪', '思颖', '佳琪', '晓燕', '淑兰', '桂英', '秀英', '玉兰', '静怡', '美玲', '雅琴'];

const IN_MALE_FIRST = ['Ravi', 'Amit', 'Rajesh', 'Sunil', 'Anil', 'Vikram', 'Rahul', 'Arjun', 'Deepak', 'Manoj', 'Suresh', 'Gaurav', 'Rohit', 'Sanjay', 'Ashok', 'Prakash', 'Nitin', 'Vijay'];
const IN_FEMALE_FIRST = ['Sunita', 'Savitri', 'Priya', 'Anita', 'Kavita', 'Rekha', 'Anjali', 'Pooja', 'Neha', 'Lakshmi', 'Meena', 'Shanti', 'Geeta', 'Ritu', 'Sarita', 'Divya'];
const IN_SURNAMES = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Das', 'Gupta', 'Reddy', 'Joshi', 'Verma', 'Mehta', 'Agarwal', 'Nair', 'Chauhan', 'Pandey', 'Yadav'];

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
  throw new Error(`未支持的国家姓名库: ${country}`);
}

// 家人姓名（父母、兄弟姐妹、配偶、子女）
export function genFamilyName(rng, country, gender) {
  return genName(rng, country, gender);
}
