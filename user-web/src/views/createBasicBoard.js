import BasicBoard from "@/views/BasicBoard";

export default function createBasicBoard(name) {
  return {
    name,
    render(createElement) {
      return createElement(BasicBoard);
    }
  }
}
