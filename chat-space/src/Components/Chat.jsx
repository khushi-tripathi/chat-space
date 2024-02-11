import React from "react";
import { useRef } from "react";
import "../styles/chat.scss";
import { socketEmit } from "./socket";
import AgentNavigator from "./AgentNavigatorChat";
import { Card } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ data }) {
  const inputRef = useRef();
  return (
    // style={{ backgroundColor: "black", color: "while" }}
    <div style={{ height: "100%" }}>
      {/* <h1>{data}</h1> */}
      {/* <input ref={inputRef} />
      <button
        onClick={() => socketEmit("chat", { message: inputRef.current.value })}
      >
        Chat
      </button> */}

      {/* <Card title={"Connected"} className="ChatCard">
        <ScrollToBottom className="checking">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem atque
          blanditiis hic, esse vero temporibus sequi doloribus incidunt nulla
          sit perspiciatis eligendi in eveniet saepe repellat! Earum aut
          deleniti officia. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Velit dignissimos perspiciatis quasi, provident expedita magni
          facilis laudantium minima, porro eius aperiam totam at facere nihil
          maiores blanditiis placeat quos dolorum. Laborum in sunt, ex nam error
          quos porro quis commodi autem. Vero molestias, inventore, ea
          voluptatem hic deleniti totam ratione voluptates earum quos labore
          soluta odit praesentium necessitatibus accusamus repellat. Laudantium
          aperiam, at asperiores odio commodi, provident sunt iste mollitia, eos
          veritatis adipisci dolorem officiis rem itaque dicta assumenda eius
          nihil perspiciatis laborum facere quia minima ducimus beatae saepe?
          Eos? Distinctio, dicta enim! Animi pariatur tempora fugit quam
          similique quibusdam voluptatem dolorum soluta quidem suscipit at,
          veritatis provident porro quae et aut qui impedit vero sapiente
          molestiae consequatur! Enim, culpa? Assumenda recusandae dolorum, odit
          magni similique beatae atque aperiam suscipit necessitatibus dolore
          eum, cum impedit deserunt tempora deleniti rem nisi ipsum dolores
          error nesciunt libero animi veritatis enim! Unde, mollitia? Temporibus
          alias doloremque adipisci fugiat minus quisquam impedit quis assumenda
          iste quasi incidunt provident explicabo maiores rerum, repudiandae
          consequatur nihil consectetur doloribus enim ipsum officiis?
          Blanditiis hic perferendis itaque amet? Harum repellendus nostrum vel
          asperiores perspiciatis fugit voluptas corporis esse dolor sed
          consequatur, numquam delectus necessitatibus voluptate quos. Sequi
          neque dolores autem totam consequuntur labore veniam laboriosam
          officia et fugit. Ad, incidunt porro. Asperiores tempora atque
          veritatis esse quia facilis exercitationem, sed amet ducimus provident
          nulla suscipit, eos natus nemo eum dolores neque recusandae laboriosam
          ipsam corrupti ratione quam? Assumenda! Cumque architecto eos fugiat
          incidunt cum quas aliquam, eum, nihil cupiditate perspiciatis veniam
          consequatur. Sed ipsum nihil perspiciatis, a facere obcaecati non!
          Inventore vero, similique voluptatem voluptate reprehenderit incidunt
          alias. Sint corporis doloribus excepturi assumenda iusto, hic pariatur
          iste neque obcaecati voluptates voluptatum eos veniam perferendis
          reiciendis nemo ullam culpa earum, quod aperiam necessitatibus minima
          eum. Recusandae accusantium quos quaerat.
        </ScrollToBottom>
      </Card> */}

      <AgentNavigator />
    </div>
  );
}
