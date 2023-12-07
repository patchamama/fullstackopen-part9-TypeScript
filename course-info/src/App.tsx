const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
  }

  interface CoursePartBase2 extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartBase2 {
    kind: 'basic';
  }

  interface CoursePartBackground extends CoursePartBase2 {
    backgroundMaterial: string;
    kind: 'background';
  }

  interface CoursePartSpecial extends CoursePartBase2 {
    requirements: string[];
    kind: 'special';
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  const courseName = 'Half Stack application development';

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
          <Part key={i} part={part} />
        ))}
      </div>
    );
  };

  const Part = (props: { part: CoursePart }) => {
    switch (props.part.kind) {
      case 'basic':
        return (
          <div>
            <h3>
              {props.part.name} {props.part.exerciseCount}
            </h3>
            <p>
              <i>{props.part.description}</i>
            </p>
          </div>
        );
      case 'group':
        return (
          <div>
            <h3>
              {props.part.name} {props.part.exerciseCount}
            </h3>
            <p>project exercises {props.part.groupProjectCount}</p>
          </div>
        );
      case 'background':
        return (
          <div>
            <h3>
              {props.part.name} {props.part.exerciseCount}
            </h3>
            <p>
              <i>{props.part.description}</i>
            </p>
            <p>
              <a href={props.part.backgroundMaterial}>Background material</a>
            </p>
          </div>
        );
      case 'special':
        return (
          <div>
            <h3>
              {props.part.name} {props.part.exerciseCount}
            </h3>
            <p>required skills: {props.part.requirements.join(', ')}</p>
            <p>
              <i>{props.part.description}</i>
            </p>
          </div>
        );
      default:
        return assertNever(props.part);
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
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
