type Props = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const StatsCard = ({
  title,
  value,
  icon,
}: Props) => {
  return (
    <div className="stats-card">

      <div className="stats-icon">
        {icon}
      </div>

      <h3>{value}</h3>

      <p>{title}</p>

    </div>
  );
};

export default StatsCard;