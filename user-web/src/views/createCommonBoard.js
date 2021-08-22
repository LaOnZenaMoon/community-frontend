import CommonBoard from "@/views/CommonBoard";

export default function createCommonBoard(name) {
  return {
    name,
    render(createElement) {
      return createElement(CommonBoard);
    }
  }
}
