type params = {
  name: string;
  isMember: boolean;
  age?: number;
  flag?: "active" | "not active" | "discontinued";
  onClickHandler?: (event: React.MouseEvent) => void;
};

const personDetails = ({ name, isMember, age, onClickHandler }: params): string => {
  return `Name: ${name}\nAge: ${age}\nIsMember: ${isMember}`;
};

personDetails({ name: "John Doe", isMember: true, flag: "not active" });
