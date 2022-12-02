<script>
import { Table, Tag } from "view-ui-plus";

export default {
  data() {
    return {
      columns: [
        {
          title: "Result",
          key: "result",
          render: (h, params) => {
            return h("div", [
              h(
                "Tag",
                {
                  style: {
                    color: params.row.style,
                  },
                },
                params.row.result
              ),
            ]);
          },
        },
        {
          title: "Meaning",
          key: "meaning",
        },
      ],
      data: [
        {
          result: "Pending",
          meaning:
            "The judge is so busy that it can't judge your submit at the moment, usually you just need to wait a minute and your submit will be judged.",
          style: "#926D00",
        },
        {
          result: "Compile Error",
          meaning:
            "Your program may have a syntax error or some other errors that can't be compiled.",
          style: "#2C73D2",
        },
        {
          result: "Accepted",
          meaning: "Your program is correct.",
          style: "green",
        },
        {
          result: "Wrong Answer",
          meaning:
            "Correct solution not reached for the inputs. The inputs and outputs that we use to test the programs are not public (it is recomendable to get accustomed to a true contest dynamic).",
          style: "red",
        },
        {
          result: "Presentation Error",
          meaning:
            "Your output format is not exactly the same as the judge's output, although your answer to the problem is correct. Check your output for spaces, blank lines,etc against the problem output specification.",
          style: "red",
        },
        {
          result: "Time Limit Exceeded",
          meaning: "Your program tried to run during too much time.",
          style: "red",
        },
        {
          result: "Memory Limit Exceeded",
          meaning: "Your program tried to run during too much memory.",
          style: "red",
        },
        {
          result: "Runtime Error",
          meaning: "Your program may have a overlapping pointer",
          style: "red",
        },
        {
          result: "Segmention Fault",
          meaning: "Your program may have a overlapping pointer or a null pointer",
          style: "red",
        },
        {
          result: "Output Limit Exceeded",
          meaning:
            "Your program tried to write too much information. This usually occurs if it goes into an infinite loop.",
          style: "#4B4453",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="faq-wrap">
    <h1>FAQ</h1>
    <hr />
    <h2>Q: What is the meaning of the judge's reply?</h2>
    <br />
    A:Here is a table of the judge's replies and their meaning:
    <Table :columns="columns" :data="data"> </Table>
  </div>
</template>

<style lang="stylus" scoped>
h1, hr
  margin-bottom: 10px
h3
  margin-bottom: 10px
table
  width: 100%
  border-collapse: collapse
  border-spacing: 0
  margin-bottom: 20px
  th
    line-height: 40px
    height: 40px
    border-bottom: 2px solid #dbdbdb
    font-size: 16px
  tr
    border-bottom: 1px solid #dbdbdb
    line-height 25px
    td:nth-child(1)
      width: 180px
    td:nth-child(2)
      padding: 5px
      padding-left: 20px
.info
  border-radius: 4px
  text-align: center
  padding: 2px
code
  background: #f7f7f7
  padding: 1px 5px
  border-radius: 3px
  border: 1px solid #eee
  margin: 0 3px
ol
  margin-bottom: 10px
</style>
