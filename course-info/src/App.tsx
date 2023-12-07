const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  const courseName = 'Half Stack application development';
  const courseParts: CoursePartBase[] = [
    // Array<CoursePartBase> is the same as CoursePartBase[]
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  const Header = (props: { name: string }) => {
    return <h1>{props.name}</h1>;
  };

  const Content = (props: { courseParts: Array<CoursePartBase> }) => {
    return (
      <div>
        {props.courseParts.map((part, i) => (
          <p key={i}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    );
  };

  const Total = (props: { totalExercises: number }) => {
    return <p>Number of exercises {props.totalExercises}</p>;
  };

  // const Total = ({totalExercises,}: {totalExercises: number;}): JSX.Element => {
  //   return <p>Number of exercises {totalExercises}</p>;
  // };

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
