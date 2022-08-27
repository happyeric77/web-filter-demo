import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

interface IUser {
  name: string;
  score: number;
  age: number;
}

const data: IUser[] = [
  { name: "Alice", score: 99, age: 18 },
  { name: "Bob", score: 30, age: 25 },
  { name: "Care", score: 80, age: 33 },
  { name: "David", score: 50, age: 98 },
  { name: "Eric", score: 98, age: 15 },
];

interface IOption {
  value: number[];
  label: string;
  selecting: boolean;
}

const Home: NextPage = () => {
  const [scoreFilter, setScoreFilter] = useState<IOption[]>([
    { value: [0, 100], label: "All", selecting: true },
    { value: [60, 100], label: "over 60", selecting: false },
    { value: [0, 60], label: "less than 60", selecting: false },
  ]);
  // const [displayingUsers, setDisplayingUser] = useState<IUser[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const displayingUsersWithMemo = useMemo(() => {
    const selectScoreRange = scoreFilter.find((s) => s.selecting)!.value;
    const newUsers = allUsers.filter(
      (u) => u.score > selectScoreRange[0] && u.score < selectScoreRange[1]
    );
    return newUsers;
  }, [scoreFilter]);

  useEffect(() => {
    // Get the data through api or some other queries
    setAllUsers(data);
  }, []);

  // useEffect(() => {
  //   filter();
  // }, [scoreFilter]);

  // function filter() {
  //   const selectScoreRange = scoreFilter.find((s) => s.selecting)!.value;
  //   const newUsers = allUsers.filter(
  //     (u) => u.score > selectScoreRange[0] && u.score < selectScoreRange[1]
  //   );
  //   setDisplayingUser(newUsers);
  // }

  return (
    <>
      <h1>Score filter</h1>
      {scoreFilter.map((s, key) => (
        <div
          key={key}
          onClick={() => {
            setScoreFilter((old) => {
              return old.map((option) => {
                if (s.label === option.label) {
                  return { ...option, selecting: true };
                } else {
                  return { ...option, selecting: false };
                }
              });
            });
          }}
        >
          <button>{s.label}</button>
        </div>
      ))}
      <h1>Result</h1>
      {displayingUsersWithMemo.map((u, key) => (
        <div key={key}>
          {u.name} {u.age} {u.score}
        </div>
      ))}
    </>
  );
};

export default Home;
