<template>
  <div class="pollEditor">
    <b-form-input
      class="pollTitle"
      v-model="pollTitle"
      :placeholder="$t('editor.poll.title')"
      :maxlength="maxPollTitleLength"
    />
    <br>
    <b-container>
      <div
        v-for="(answer, index) in pollAnswers"
        :key="index"
      >
        <b-row>
          <b-col>
            <b-form-group>
            <b-form-radio
              disabled
            />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-model="pollAnswers[index].answer"
              :placeholder="$t('editor.poll.templateAnswer')"
              :maxlength="maxPollAnswerLength"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <b-button
              variant="danger"
              @click="removeAnswer(index)"
            >
              <font-awesome-icon icon="minus"/>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <br>
    <b-button
        variant="primary"
        class="pollAddButton"
        @click="addAnswer()"
    >
    <font-awesome-icon icon="plus"/>
    </b-button>
    <br>
    <b-form-checkbox
      v-model="allowMultipleVotes"
      name="checkbox-mv"
      value="true"
      unchecked-value="false"
    >
      {{$t('editor.poll.allowMultipleVotes')}}
    </b-form-checkbox>
    <hr>
    <b-button
      variant="secondary"
      class="postButton"
      @click="createPoll()"
    >
      {{$t('editor.poll.post')}}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'PollEditor',
  data () {
    return {
      pollTitle: '',
      pollAnswers: [
        { answer: '' },
        { answer: '' }
      ],
      allowMultipleVotes: false,
      maxPollTitleLength: 50,
      maxPollAnswerLength: 30,
      pollContent: ''
    }
  },
  methods: {
    addAnswer: function () {
      this.pollAnswers.push({ answer: '' })
    },
    removeAnswer: function (index) {
      this.pollAnswers.splice(index, 1)
    },
    createPoll: function () {
      if (this.pollTitle === '') {
        alert(this.$t('editor.poll.missingTitle'))
      } else {
        // 2 or more answers = valid poll
        if (this.pollAnswers.length <= 1) {
          alert(this.$t('editor.poll.missingAnswers'))
        } else {
          var index = 0
          var validAnswersId = []
          var validAnswers = []
          // Prepare unique time string
          const currently = new Date()
          const timeString = currently.getFullYear() + '' + currently.getMonth() + '' +
            currently.getDay() + '' + currently.getHours() + '' +
            currently.getMinutes() + '' + currently.getSeconds() + '' +
            currently.getMilliseconds()
          // Generate HTML
          this.pollContent = ''
          if (!this.allowMultipleVotes) {
            // Use radio buttons
            this.pollAnswers.forEach(pollAnswer => {
              const answer = pollAnswer.answer
              if (answer !== '') {
                validAnswersId.push(index)
                validAnswers.push(answer)
                this.pollContent += '<div class="form-check">' +
                  '<div class="d-flex align-self-start">' +
                  '<input class="form-check-input" type="radio" name="rb-' +
                  timeString + '" id="rb-' + timeString + '-aidx' + index + '">'
                this.pollContent += '<label class="form-check-label" for="rb-' + timeString +
                  '-aidx' + index + '">' + answer + '</label></div></div>'
                index++
              }
            })
          } else {
            // Use checkboxes instead
            this.pollAnswers.forEach(pollAnswer => {
              const answer = pollAnswer.answer
              if (answer !== '') {
                validAnswersId.push(index)
                validAnswers.push(answer)
                this.pollContent += '<div class="form-check">' +
                  '<div class="d-flex align-self-start">' +
                  '<input class="form-check-input" type="checkbox" ' +
                  'id="cb-' + timeString + 'aidx' + index + '">'
                this.pollContent += '<label class="form-check-label" for=cb-' + timeString +
                  'aidx' + index + '">' + answer + '</label></div></div>'
                index++
              }
            })
          }
          // End of HTML generator
          if (validAnswers.length <= 1) {
            alert(this.$t('editor.poll.missingAnswers'))
            this.pollContent = ''
          } else {
            this.$emit('create-poll', this.pollTitle, this.pollContent, validAnswersId, validAnswers)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .pollTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .pollAddButton {
    width: 45%;
  }

  .postButton {
    width: auto;
  }
</style>
