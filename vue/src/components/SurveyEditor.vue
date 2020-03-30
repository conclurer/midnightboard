<template>
  <div class="surveyEditor">
    <br>
    <h2>{{$t('editor.survey.heading')}}</h2>
    <b-form-input
      class="surveyTitle"
      v-bind:input="surveyTitle"
      v-on:input="surveyTitle = $event"
      :placeholder="$t('editor.survey.title')"
      :maxlength="maxSurveyTitleLength"
    />
    <div v-if="surveyQuestions.length >= 0">
      <div
        v-for="(question, index) in surveyQuestions"
        :key="index"
      >
        <hr/>
        <!-- Remove button with question -->
        <b-row>
          <b-col cols="1">
            <b-button
              variant="danger"
              @click="removeQuestion(index)"
            >
              <font-awesome-icon icon="minus"/>
            </b-button>
          </b-col>
          <b-col cols="10">
          <b-form-input
            v-bind:input="surveyQuestions[index]"
            v-on:input="surveyQuestions[index] = $event"
            :placeholder="$t('editor.survey.templateQuestion')"
            :maxlength="maxSurveyInputFieldQuestionLength"
          />
          </b-col>
        </b-row>
        <br>
        <!-- Regular input field questions -->
        <div v-if="surveyQuestionType[index] === 'IFQ'">
          <b-form-input
            v-bind:value="surveyQuestionElement[index]"
            v-on:input="surveyQuestionElement[index] = $event"
            :placeholder="$t('editor.survey.templateAnswer')"
            :maxlength="maxSurveyInputFieldAnswerLength"
          />
        </div>
        <!-- Regular input field questions -->
        <div v-else-if="surveyQuestionType[index] === 'TAQ'">
          <b-form-textarea
            id="textarea-default"
            v-bind:input="surveyQuestionElement[index]"
            v-on:input="surveyQuestionElement[index] = $event"
            :placeholder="$t('editor.survey.templateAnswer')"
            :maxlength="maxSurveyTextAreaAnswerLength"
          >
          </b-form-textarea>
        </div>
        <!-- Single/Multiple-Choice-Questions -->
        <div v-else-if="surveyQuestionType[index] === 'MCQ'">
          <b-container>
            <div
              v-for="(answer, answerIndex) in surveyQuestionElement[index]"
              :key="answerIndex"
            >
              <b-row>
                <b-col>
                  <b-form-group>
                    <b-form-checkbox disabled/>
                  </b-form-group>
                </b-col>
                <b-col cols="8">
                  <b-form-input
                    v-bind:input="surveyQuestionElement[index][answerIndex]"
                    v-on:input="surveyQuestionElement[index][answerIndex] = $event"
                    :placeholder="$t('editor.survey.templateAnswer')"
                    :maxlength="maxSurveyChoiceAnswerLength"
                  >
                  </b-form-input>
                </b-col>
                <b-col>
                  <b-button
                    variant="danger"
                    @click="removeChoiceAnswer(answerIndex, index)"
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
            class="surveyAddChoiceButton"
            @click="addChoiceAnswer(index)"
          >
          <font-awesome-icon icon="plus"/>
          </b-button>
          <br>
          <b-form-checkbox
            v-model="allowMultipleVotes[index]"
            value="true"
            unchecked-value="false"
          >
            {{$t('editor.survey.allowMultipleVotes')}}
          </b-form-checkbox>
        </div>
        <br>
      </div>
      <br>
    </div>
    <h4>{{$t('editor.survey.questionWith')}}</h4>
    <b-button-group>
      <b-button
        variant="primary"
        class="surveyAddInputFieldQuestion"
        @click="addInputFieldQuestion()"
      >
      {{$t('editor.survey.addInputFieldQuestion')}}
      </b-button>
      <b-button
        variant="primary"
        class="surveyAddTextAreaQuestion"
        @click="addTextAreaQuestion()"
      >
      {{$t('editor.survey.addTextAreaQuestion')}}
      </b-button>
      <b-button
        variant="primary"
        class="surveyAddMultipleChoiceQuestion"
        @click="addMultipleChoiceQuestion()"
      >
      {{$t('editor.survey.addMultipleChoiceQuestion')}}
      </b-button>
    </b-button-group>
    <hr>
    <b-button
      variant="secondary"
      class="postButton"
      @click="createSurvey()"
    >
      {{$t('editor.survey.post')}}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'surveyEditor',
  data () {
    return {
      surveyTitle: '',
      // Index of surveyQuestions links to the other arrays
      surveyQuestions: ['', '', ''],
      /*
        InputFieldQuestion: IFQ
        TextAreaQuestion: TAQ
        MultipleChoiceQuestion: MCQ
      */
      surveyQuestionType: ['IFQ', 'TAQ', 'MCQ'],
      surveyQuestionElement: ['', '', ['', '']],
      allowMultipleVotes: [null, null, false],
      // Max length of different inputs
      maxSurveyTitleLength: 50,
      maxSurveyInputFieldQuestionLength: 40,
      maxSurveyInputFieldAnswerLength: 35,
      maxSurveyTextAreaAnswerLength: 200,
      maxSurveyChoiceAnswerLength: 30,
      // Survey as HTML
      surveyContent: ''
    }
  },
  methods: {
    addInputFieldQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('IFQ')
      this.surveyQuestionElement.push('')
    },
    addTextAreaQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('TAQ')
      this.surveyQuestionElement.push('')
    },
    addMultipleChoiceQuestion () {
      this.allowMultipleVotes.push(false)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('MCQ')
      this.surveyQuestionElement.push([''])
    },
    removeQuestion (questionIndex) {
      this.allowMultipleVotes.splice(questionIndex, 1)
      this.surveyQuestions.splice(questionIndex, 1)
      if (this.surveyQuestionType[questionIndex] === 'MCQ') {
        this.surveyQuestionType.splice(questionIndex, 1)
        this.surveyQuestionElement.splice(questionIndex, 1)
      } else {
        this.surveyQuestionType.splice(questionIndex, 1)
        this.surveyQuestionElement.splice(questionIndex, 1)
      }
    },
    addChoiceAnswer (questionIndex) {
      this.surveyQuestionElement[questionIndex].push('')
    },
    removeChoiceAnswer (answerIndex, questionIndex) {
      this.surveyQuestionElement[questionIndex].splice(answerIndex, 1)
    },
    createSurvey () {
      if (this.surveyTitle === '') {
        alert(this.$t('editor.survey.missingTitle'))
      } else {
        var questionIndices = []
        var mcqAnswers = []
        // Start form
        this.surveyContent = '<form>'
        this.surveyQuestions.forEach((question, index) => {
          questionIndices.push(index)
          const questionType = this.surveyQuestionType[index]
          const questionElement = this.surveyQuestionElement[index]
          const allowMultipleVote = this.allowMultipleVotes[index]
          if (questionType === 'IFQ') {
            this.surveyContent += '<div class="form-group"><label for="inputText' + index + '">' +
            question + '</label><input type="text" class="form-control is-valid" id="inputText' + index +
            '" placeholder="' + questionElement + '" required></div>'
          } else if (questionType === 'TAQ') {
            this.surveyContent += '<div class="form-group"><label for="inputTextArea' + index + '">' +
            question + '</label><textarea class="form-control is-valid" id="inputTextArea' + index +
            '" rows="3" placeholder="' + questionElement + '" required></textarea></div>'
          } else if (questionType === 'MCQ') {
            var answerIndex = 0
            // Need unique checkbox name for single vote surveys
            var checkBoxName = ''
            if (!allowMultipleVote) {
              const birthday = new Date()
              const yearM = birthday.getFullYear() + '-'
              const monthM = birthday.getMonth() + '-'
              const dayM = birthday.getDay() + '-'
              const time = birthday.getHours() + '' + birthday.getMinutes() + '' +
              birthday.getSeconds() + '' + birthday.getMilliseconds()
              checkBoxName = 'cb-' + yearM + monthM + dayM + time
            }
            // 2 or more answers = valid MCQ
            if (questionElement.length <= 1) {
              alert(this.$t('editor.survey.missingMCQAnswers'))
            } else {
              this.surveyContent += '<div class="form-check">'
              questionElement.forEach(answer => {
                if (answer !== '') {
                  mcqAnswers.push(answer)
                  this.surveyContent += '<input class="form-check-input" type="checkbox" name="' +
                    checkBoxName + '" id="cbSvy' + index + 'Idx' + answerIndex + '">' +
                    '<label class="form-check-label" for="cbSvy' + index + 'Idx' + answerIndex + '>' +
                    question + '</label>'
                  answerIndex++
                }
              })
              this.surveyContent += '</div>'
            }
          }
        })
        // Form end
        this.surveyContent += '</form>'
        if (mcqAnswers.length <= 1) {
          alert(this.$t('editor.survey.missingMCQAnswers'))
        } else {
          this.$log.debug(this.surveyContent)
          this.$log.debug(questionIndices)
          this.$log.debug(mcqAnswers)
          // this.$emit('create-survey', this.surveyTitle, this.surveyContent, questionIndices, mcqAnswers)
        }
      }
    }
  }
}
</script>

<style scoped>
  .surveyTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .surveyAddChoiceButton {
    width: 45%;
  }

  .postButton {
    width: auto;
  }
</style>
