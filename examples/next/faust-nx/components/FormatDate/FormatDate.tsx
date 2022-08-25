type Props = {
  date: string,
};

export default function FormatDate({ date }: Props): JSX.Element | null {
  let formattedDate = new Date(date);

  if (isNaN(formattedDate.valueOf())) {
    return null;
  }

  const timeformat = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false
  } as const;

  return <>{formattedDate.toLocaleDateString('en-US', timeformat)}</>;
}
