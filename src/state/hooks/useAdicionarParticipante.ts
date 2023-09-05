import { useRecoilState, useSetRecoilState } from "recoil";
import { erroState, listaParticipanteState } from "../atom";

export const useAdicionarParticipante = () => {
  const [lista, setLista] = useRecoilState(listaParticipanteState);
  const setErro = useSetRecoilState(erroState);

  return (nomeDoParticipante: string) => {
    if (lista.includes(nomeDoParticipante)) {
      setErro("Nomes duplicados não são permitidos");
      setTimeout(() => {
        setErro("");
      }, 3000);
      return;
    }
    return setLista([...lista, nomeDoParticipante]);
  };
};
