<template>
  <div class="board">
    <!-- Displays content when editor is not displayed -->
    <div
      class="inner-board"
      v-if="!this.editorActive"
      :key="editorActive"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
      >
        <div
          v-for="note in notes.slice().reverse()"
          :key="note.index"
          v-masonry-tile
          class="item"
        >
          <!-- Display common text notes -->
          <b-card
            v-if="note.typeOfPost === 'application/note'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-html="note.content" />
            </b-card-text>
          </b-card>

          <!-- Display images of type JPEG -->
          <b-card
            v-if="note.typeOfPost === 'image/jpeg'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/jpeg;base64,' + note.content"
            >
            </b-card-img>
            <a v-bind:href="'data:image/jpeg;base64,' + note.content" :download="note.title + '.jpeg'">{{$t('board.download.image')}}</a>
          </b-card>

          <!-- Display images of type PNG -->
          <b-card
            v-if="note.typeOfPost === 'image/png'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/png;base64,' + note.content"
            >
            </b-card-img>
            <a v-bind:href="'data:image/png;base64,' + note.content" :download="note.title + '.png'">{{$t('board.download.image')}}</a>
          </b-card>

          <!-- Display PDF as preview and link -->
          <b-card
            v-if="note.typeOfPost === 'application/pdf'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            style="min-height: 745px;"
            :title="note.title"
            :key="editorActive"
          >
            <hr />
            <b-card-text>
              <pdf :src="'data:application/pdf;base64,' + note.content" style="height: 585;"></pdf>
              <a v-bind:href="'data:application/pdf;base64,' + note.content" :download="note.title + '.pdf'">{{$t('board.download.pdf')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word 97-2003 document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msword'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-word" size="10x"/><br><br>
              <a v-bind:href="'data:application/msword;base64,' + note.content" :download="note.title + '.doc'">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-word" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + note.content" :download="note.title + '.docx'">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel 97-2003 spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.ms-excel'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-excel" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.ms-excel;base64,' + note.content" :download="note.title + '.xls'">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-excel" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + note.content" :download="note.title + '.xlsx'">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint 97-2003 presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.ms-powerpoint'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.ms-powerpoint;base64,' + note.content" :download="note.title + '.ppt'">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + note.content" :download="note.title + '.pptx'">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display polls -->
          <b-card
            v-bind:id="note.id"
            v-if="note.typeOfPost === 'application/poll'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-if="!pollShowResults[pollResultMap[note.id]]">
                <div v-html="note.content" />
                <br>
                <b-button-group>
                  <b-button
                    variant="primary"
                    class="voteButton"
                    @click="votePoll"
                  >
                    {{$t('board.poll.vote')}}
                  </b-button>
                  <b-button
                    variant="info"
                    class="showResultButton"
                    @click="showResult"
                  >
                    {{$t('board.poll.showResult')}}
                  </b-button>
                  <b-button
                    variant="danger"
                    class="resetRadioButtons"
                    @click="resetRadioButtons"
                  >
                    {{$t('board.poll.resetRadioButtons')}}
                  </b-button>
                </b-button-group>
              </div>
              <div v-if="pollShowResults[pollResultMap[note.id]]">
                <div class="bar-chart">
                  <ul class="chart-horizonzal">
                    <div
                      v-for="index of pollAVVPMap[pollResultMap[note.id]]"
                      :key="index"
                      >
                      <b>{{ pollVotesPercent[index] }}% ({{ pollVotes[index] }} votes)</b>
                      <li class="chart-bar" :style="{width: pollVotesPercent[index] + '%'}">
                        <span class="chart-label">
                          {{ pollAnswers[index] }}
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <br><br><br><br><br> <!-- Style has to be changed to match different sizes -->
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>

    <!-- Displays content when editor is displayed -->
    <div
      class="inner-board"
      v-if="this.editorActive"
      style="display: grid; grid-template-columns: 1fr 500px;"
    >
      <div
        class="content"
        v-masonry
        transition-duration="0.4s"
        item-selector=".item"
        style="grid-column: 1 / 2;"
        :key="editorActive"
      >
        <div
          v-for="note in notes.slice().reverse()"
          :key="note.index"
          v-masonry-tile
          class="item"
        >
          <!-- Display common text notes -->
          <b-card
            v-if="note.typeOfPost === 'application/note'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-html="note.content" />
            </b-card-text>
          </b-card>

          <!-- Display images of type JPEG -->
          <b-card
            v-if="note.typeOfPost === 'image/jpeg'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/jpeg;base64,'+note.content"
            >
            </b-card-img>
            <a v-bind:href="'data:image/jpeg;base64,' + note.content" :download="note.title + '.jpeg'">{{$t('board.download.image')}}</a>
          </b-card>

          <!-- Display images of type PNG -->
          <b-card
            v-if="note.typeOfPost === 'image/png'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-img
              v-bind:src="'data:image/png;base64,'+note.content"
            >
            </b-card-img>
            <a v-bind:href="'data:image/png;base64,' + note.content" :download="note.title + '.png'">{{$t('board.download.image')}}</a>
          </b-card>

          <!-- Display PDF as preview and link -->
          <b-card
            v-if="note.typeOfPost === 'application/pdf'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            style="min-height: 745px;"
            :title="note.title"
            :key="editorActive"
          >
            <hr />
            <b-card-text>
              <pdf :src="'data:application/pdf;base64,' + note.content" style="height: 585;"></pdf>
              <a v-bind:href="'data:application/pdf;base64,' + note.content" :download="note.title + 'pdf'">{{$t('board.download.pdf')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word 97-2003 document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msword'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-word" size="10x"/><br><br>
              <a v-bind:href="'data:application/msword;base64,' + note.content" :download="note.title + '.doc'">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Word document as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-word" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + note.content" :download="note.title + '.docx'">{{$t('board.download.word')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel 97-2003 spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/msexcel'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-excel" size="10x"/><br><br>
              <a v-bind:href="'data:application/msexcel;base64,' + note.content" :download="note.title + '.xls'">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display Excel spreadsheet as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-excel" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + note.content" :download="note.title + '.xlsx'">{{$t('board.download.excel')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint 97-2003 presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/mspowerpoint'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
              <a v-bind:href="'data:application/mspowerpoint;base64,' + note.content" :download="note.title + '.ppt'">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

          <!-- Display PowerPoint presentation as link -->
          <b-card
            v-if="note.typeOfPost === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <font-awesome-icon icon="file-powerpoint" size="10x"/><br><br>
              <a v-bind:href="'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,' + note.content" :download="note.title + '.pptx'">{{$t('board.download.powerpoint')}}</a>
            </b-card-text>
          </b-card>

           <!-- Display polls -->
          <b-card
            v-bind:id="note.id"
            v-if="note.typeOfPost === 'application/poll'"
            class="note"
            bg-variant="dark"
            text-variant="white"
            :title="note.title"
          >
            <hr />
            <b-card-text>
              <div v-if="!pollShowResults[pollResultMap[note.id]]">
                <div v-html="note.content" />
                <br>
                <b-button-group>
                  <b-button
                    variant="primary"
                    class="voteButton"
                    @click="votePoll"
                  >
                    {{$t('board.poll.vote')}}
                  </b-button>
                  <b-button
                    variant="info"
                    class="showResultButton"
                    @click="showResult"
                  >
                    {{$t('board.poll.showResult')}}
                  </b-button>
                  <b-button
                    variant="danger"
                    class="resetRadioButtons"
                    @click="resetRadioButtons"
                  >
                    {{$t('board.poll.resetRadioButtons')}}
                  </b-button>
                </b-button-group>
              </div>
              <div v-if="pollShowResults[pollResultMap[note.id]]">
                <div class="bar-chart">
                  <ul class="chart-horizonzal">
                    <div
                      v-for="index of pollAVVPMap[pollResultMap[note.id]]"
                      :key="index"
                      >
                      <b>{{ pollVotesPercent[index] }}% ({{ pollVotes[index] }} votes)</b>
                      <li class="chart-bar" :style="{width: pollVotesPercent[index] + '%'}">
                        <span class="chart-label">
                          {{ pollAnswers[index] }}
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <br><br><br><br><br>
            </b-card-text>
          </b-card>
        </div>
      </div>

      <!-- Display right bar -->
      <div
        class="rightBar"
      >
        <div>
          <div v-smoothscrollbar="{ listener, options }">
            <EditorSidebar
              @add-note="addNote"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import EditorSidebar from '@/components/EditorSidebar.vue'
import pdf from 'vue-pdf'

export default {
  name: 'Board',
  components: {
    EditorSidebar,
    pdf
  },
  data () {
    return {
      listener: () => {},
      options: {},
      pollResultMap: [], // links to pollShowResults
      pollShowResults: [],
      pollAVVPMap: [], // links to pollAnswers/pollVotes/pollVotesPercent
      pollAnswers: [],
      pollVotes: [],
      pollVotesPercent: []
    }
  },
  methods: {
    addNote: async function () {
      // Notify notice board
      this.$emit('add-note')
    },
    initPoll: async function (postId, element) {
      // Add poll to result map
      this.pollResultMap[postId] = this.pollShowResults.length
      this.pollShowResults[this.pollResultMap[postId]] = false
      // Get current votes
      // Axios GET
      await axios
        .get('http://localhost:1337/api/polls/' + postId, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        )
        .then(response => {
          const votes = response.data.votes
          var answers = []
          var votesNumber = []
          var votesPercent = []
          var votesSum = 0
          // Calculate sum of votes
          votes.forEach(vote => {
            votesSum += vote
          })
          // Extract poll data from html
          for (const child of element.target.parentElement.parentElement.firstChild.firstChild.children) {
            const voteNumber = votes[child.firstChild.firstChild.id]
            var votePercent = 0
            if (votesSum > 0) {
              votePercent = (voteNumber / votesSum) * 100
            }
            // Save data local
            answers.push(child.innerText)
            votesNumber.push(voteNumber)
            votesPercent.push(votePercent.toFixed(2))
          }
          // Check if map has indices for this poll
          if (this.pollAVVPMap[this.pollResultMap[postId]]) {
            this.pollAVVPMap[this.pollResultMap[postId]].forEach(function (index, counter) {
              this.pollAnswers[index] = answers[counter]
              this.pollVotes[index] = votesNumber[counter]
              this.pollVotesPercent[index] = votesPercent[counter].toFixed(2)
            })
          } else {
            // No indices in map
            var indices = []
            answers.forEach(answer => {
              indices.push(this.pollAnswers.length)
              this.pollAnswers.push(answer)
            })
            votesNumber.forEach(voteNumber => {
              this.pollVotes.push(voteNumber)
            })
            votesPercent.forEach(votePercent => {
              this.pollVotesPercent.push(votePercent)
            })
            this.pollAVVPMap[this.pollResultMap[postId]] = indices
          }
          // Needed for array change detection
          this.pollAnswers.push('')
          this.pollAnswers.pop()
          this.pollVotes.push('')
          this.pollVotes.pop()
          this.pollVotesPercent.push('')
          this.pollVotesPercent.pop()
          // Show result for this poll
          this.pollShowResults[this.pollResultMap[postId]] = true
          // Also needed for array change detection
          this.pollShowResults.push('')
          this.pollShowResults.pop()
        })
        .catch(err => this.$log.error(err))
    },
    votePoll: async function (element) {
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
      // Axios PUT to update votes for the answer
      const answerIds = []
      for (const child of element.target.parentElement.parentElement.firstChild.firstChild.children) {
        if (child.firstChild.firstChild.checked === true) {
          answerIds.push(child.firstChild.firstChild.id)
        }
      }
      if (answerIds.length <= 0) {
        alert(this.$t('board.poll.invalidVote'))
      } else {
        for (const answerId of answerIds) {
          const jsonBody = JSON.stringify({
            postId: postId,
            answerId: answerId
          })

          await axios
            .put('http://localhost:1337/api/polls', jsonBody, {
              headers: {
                'Content-Type': 'application/json'
              }
            }
            )
            .then(res => {})
            .catch(err => this.$log.error(err))
        }
        this.initPoll(postId, element)
      }
    },
    showResult: function (element) {
      // Show current results
      const postId = element.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
      this.initPoll(postId, element)
    },
    resetRadioButtons: function (element) {
      // Reset radio buttons to inital state
      for (const child of element.target.parentElement.parentElement.firstChild.firstChild.children) {
        if (child.firstChild.firstChild.type === 'radio') {
          child.firstChild.firstChild.checked = false
        }
      }
    }
  },
  props: ['notes', 'editorActive']
}
</script>

<style scoped>
  .board {
    position: sticky;
    width: 100vw;
    min-height: 100vh;
    background: var(--background-board);
    display: grid;
    grid-auto-rows: min-content;
  }

  .inner-board {
    grid-row: 1 / 1;
  }

  hr {
    height: 1px;
    border: none;
    background-color: #aaa;
  }

  li {
    display: list-item;
  }

  ul {
    text-align: left;
  }

  a {
    color: var(--link);
  }

  .content {
    position: static;
    margin: 10px 10px;
  }

  .note {
    width: 480px;
    margin: 10px;
  }

  .rightBar {
    grid-column: 2 / 3;
    width: 500px;
    height: 100%;
    position: fixed;
    right: 0px;
    background: #fff;
  }

  .chart-horizontal {
    height: 100%;
    position: relative;
  }

  .chart-bar {
    height: 30px;
    margin-bottom: 10px;

    background: linear-gradient(to left, #4cb8c4, #3cd3ad);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .chart-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    line-height: 30px;
    color: rgb(255, 255, 255);
  }
</style>
