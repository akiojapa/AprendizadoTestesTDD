import { atom } from "recoil";

export const listaParticipanteState = atom<String[]>({
  key: "listaParticipanteState",
  default: [],
});

export const resultadoAmigoSecreto = atom<Map<String, String>>({
    key: "resultadoAmigoSecreto",
    default: new Map(),
})

export const erroState = atom<String>({
  key: "erroState",
  default: "",
});

