type HeaderProps = {
  title: string;
};

export function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <header>
      <span className="category">
        Categoria:<span> {title}</span>
      </span>
    </header>
  );
}
