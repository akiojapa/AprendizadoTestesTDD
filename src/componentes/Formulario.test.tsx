import React from "react";
import Formulario from "./Formulario";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";

// Jest

describe("Descrição do componente formulário", () => {
  test("Quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      /Insira o nome dos participantes/i
    );
    //encontrar no DOM o input

    //encontrar o botão
    const botao = screen.getByRole("button", { name: /adicionar/i });

    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
    //garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("Adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      /Insira o nome dos participantes/i
    );
    //encontrar no DOM o input

    //encontrar o botão
    const botao = screen.getByRole("button", { name: /adicionar/i });

    //inserir valor no input
    fireEvent.change(input, { target: { value: "João" } });

    //clicar no botão de submeter
    fireEvent.click(botao);

    //garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    //garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("Nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      /Insira o nome dos participantes/i
    );

    const botao = screen.getByRole("button", { name: /adicionar/i });

    fireEvent.change(input, { target: { value: "João" } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "João" } });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos"
    );
  });

  test("A mensagem de erro deve sumir após os timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      /Insira o nome dos participantes/i
    );

    const botao = screen.getByRole("button", { name: /adicionar/i });

    fireEvent.change(input, { target: { value: "João" } });
    fireEvent.click(botao);

    fireEvent.change(input, { target: { value: "João" } });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
