import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";

const ListaParticipantes = () => {
  const participantes: String[] = useListaDeParticipantes();

  return (
    <ul>
      {participantes.map((participante, i) => (
        <li key={i}>{participante}</li>
      ))}
    </ul>
  );
};

export default ListaParticipantes;
