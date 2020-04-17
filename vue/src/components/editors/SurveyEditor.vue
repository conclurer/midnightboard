<!-- This editor is used to create complex survey. They can contain several questions with a text field for the answer and polls -->
<template>
  <div class="surveyEditor">
    <b-form-input
      class="surveyTitle"
      v-model="surveyTitle"
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
            v-model="surveyQuestions[index]"
            :placeholder="$t('editor.survey.templateQuestion')"
            :maxlength="maxSurveyInputFieldQuestionLength"
          />
          </b-col>
        </b-row>
        <br>
        <!-- Regular input field questions -->
        <div v-if="surveyQuestionType[index] === 'IFQ'">
          <b-form-input
            v-model="surveyQuestionElement[index]"
            :placeholder="$t('editor.survey.templatePlaceholderTextField')"
            :maxlength="maxSurveyInputFieldAnswerLength"
          />
          <label>{{$t('editor.survey.labelPlaceholderTextField')}}</label>
        </div>
        <!-- Text area questions -->
        <div v-else-if="surveyQuestionType[index] === 'TAQ'">
          <b-form-textarea
            id="textarea-default"
            v-model="surveyQuestionElement[index]"
            :placeholder="$t('editor.survey.templatePlaceholderTextArea')"
            :maxlength="maxSurveyTextAreaAnswerLength"
            :rows="maxSurveyTextAreaRows"
            no-resize
          />
          <label>{{$t('editor.survey.labelPlaceholderTextArea')}}</label>
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
                    v-model="surveyQuestionElement[index][answerIndex]"
                    :placeholder="$t('editor.survey.templateAnswer')"
                    :maxlength="maxSurveyChoiceAnswerLength"
                  />
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
  name: 'SurveyEditor',
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
      maxSurveyInputFieldQuestionLength: 60,
      maxSurveyInputFieldAnswerLength: 50,
      maxSurveyTextAreaAnswerLength: 150,
      maxSurveyTextAreaRows: 3,
      maxSurveyChoiceAnswerLength: 30,
      // Survey as HTML
      surveyContent: ''
    }
  },
  methods: {
    // Adds a question with an input field to the survey
    addInputFieldQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('IFQ')
      this.surveyQuestionElement.push('')
    },
    // Adds a question with a large text field for the answer
    addTextAreaQuestion () {
      this.allowMultipleVotes.push(null)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('TAQ')
      this.surveyQuestionElement.push('')
    },
    // Used to add a new single/multiple-choice question
    addMultipleChoiceQuestion () {
      this.allowMultipleVotes.push(false)
      this.surveyQuestions.push('')
      this.surveyQuestionType.push('MCQ')
      this.surveyQuestionElement.push([''])
    },
    // Used to remove a single/multiple-choice question
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
    // Adds a single/multiple-choice answer to a question
    addChoiceAnswer (questionIndex) {
      this.surveyQuestionElement[questionIndex].push('')
    },
    // Removes a single/multiple-choice answer
    removeChoiceAnswer (answerIndex, questionIndex) {
      this.surveyQuestionElement[questionIndex].splice(answerIndex, 1)
    },
    // Used to create new surveys which can be send to the backend
    createSurvey () {
      var invalidInput = false
      var containsMCQ = false
      var answerDuplicates = false
      if (this.surveyTitle === '') {
        alert(this.$t('editor.survey.missingTitle'))
        invalidInput = true
      } else {
        var questionIndices = []
        var questions = []
        var mcqAnswers = []
        // Generate HTML
        this.surveyContent = ''
        this.surveyQuestions.forEach((question, index) => {
          questionIndices.push(index)
          questions.push(question)
          const questionType = this.surveyQuestionType[index]
          const questionElement = this.surveyQuestionElement[index]
          // Prepare unique time string
          const currently = new Date()
          const timeString = currently.getFullYear() + '' + currently.getMonth() + '' +
            currently.getDay() + '' + currently.getHours() + '' + currently.getMinutes() + '' +
            currently.getSeconds() + '' + currently.getMilliseconds()
          // Evaluate user input for placeholder and max length
          var placeholder = ''
          var answerMaxLength = 0
          var answerMaxRows = 0
          if (questionType !== 'MCQ' && questionElement.includes('&')) {
            placeholder = questionElement.split('&')[0]
            if (!isNaN(questionElement.split('&')[1])) {
              if (questionType === 'TAQ') {
                answerMaxRows = parseInt(questionElement.split('&')[1], 10)
                if (answerMaxRows <= 0 || answerMaxRows > 15) {
                  answerMaxRows = this.maxSurveyTextAreaRows
                }
                answerMaxLength = answerMaxRows * 50
              } else {
                answerMaxLength = parseInt(questionElement.split('&')[1], 10)
                if (answerMaxLength <= 4 || answerMaxLength > 50) {
                  answerMaxLength = this.maxSurveyInputFieldAnswerLength
                }
              }
            }
          } else {
            if (questionType === 'IFQ') {
              answerMaxLength = this.maxSurveyInputFieldAnswerLength
            } else if (questionType === 'TAQ') {
              answerMaxRows = this.maxSurveyTextAreaRows
              answerMaxLength = this.maxSurveyTextAreaAnswerLength
            }
          }
          const allowMultipleVote = this.allowMultipleVotes[index]
          if (questionType === 'IFQ') {
            if (question === '') {
              alert(this.$t('editor.survey.missingIFQQuestion'))
              invalidInput = true
            } else {
              this.surveyContent += '<div class="form-group"><div class="d-flex align-self-start">' +
                '<label for="inputText-' + timeString + '-qidx' + index + '">' + question + '</label></div>' +
                '<input type="text" class="form-control" id="inputText-' + timeString + '-qidx' + index + '" ' +
                'placeholder="' + placeholder + '" maxlength="' + answerMaxLength + '" required></div>'
            }
          } else if (questionType === 'TAQ') {
            if (question === '') {
              alert(this.$t('editor.survey.missingTAQQuestion'))
              invalidInput = true
            } else {
              this.surveyContent += '<div class="form-group"><div class="d-flex align-self-start">' +
                '<label for="inputTextArea-' + timeString + '-qidx' + index + '">' + question + '</label></div>' +
                '<textarea class="form-control" id="inputTextArea-' + timeString + '-qidx' + index + '" ' +
                'placeholder="' + placeholder + '" maxlength="' + answerMaxLength + '" ' +
                'rows="' + answerMaxRows + '"style="resize:none;" required>' +
                '</textarea></div>'
            }
          } else if (questionType === 'MCQ') {
            containsMCQ = true
            if (question === '') {
              alert(this.$t('editor.survey.missingMCQQuestion'))
              invalidInput = true
            } else {
              // 2 or more answers = valid MCQ
              if (questionElement.length <= 1) {
                alert(this.$t('editor.survey.missingMCQAnswers'))
                invalidInput = true
              } else {
                var answerIndex = 0
                this.surveyContent += '<div class="form-group">' +
                  '<div class="d-flex align-self-start"><p>' + question + '</p></div>'
                // Need unique radio button name for single vote surveys
                if (!allowMultipleVote) {
                  // Use radio buttons
                  questionElement.forEach(answer => {
                    if (answer !== '') {
                      mcqAnswers.forEach(mcqAnswer => {
                        if (mcqAnswer[0] === index && mcqAnswer[1] === answer) {
                          answerDuplicates = true
                        }
                      })
                      mcqAnswers.push([index, answer])
                      this.surveyContent += '<div class="form-check">' +
                        '<div class="d-flex align-self-start">' +
                        '<input class="form-check-input" type="radio" name="rb-' + timeString + '-qidx' +
                        index + '" id="rb-' + timeString + '-qidx' + index + '-aidx' + answerIndex + '">'
                      this.surveyContent += '<label class="form-check-label" for="rb-' + timeString +
                        '-qidx' + index + '-aidx' + answerIndex + '">' + answer + '</label></div></div>'
                      answerIndex++
                    }
                  })
                } else {
                  // Use checkboxes
                  questionElement.forEach(answer => {
                    if (answer !== '') {
                      mcqAnswers.forEach(mcqAnswer => {
                        if (mcqAnswer[0] === index && mcqAnswer[1] === answer) {
                          answerDuplicates = true
                        }
                      })
                      mcqAnswers.push([index, answer])
                      this.surveyContent += '<div class="form-check">' +
                        '<div class="d-flex align-self-start">' +
                        '<input class="form-check-input" type="checkbox" id="cb-' + timeString + '-qidx' +
                        index + '-aidx' + answerIndex + '">'
                      this.surveyContent += '<label class="form-check-label" for="cb-' + timeString + '-qidx' +
                        index + '-aidx' + answerIndex + '">' + answer + '</label></div></div>'
                      answerIndex++
                    }
                  })
                }
                this.surveyContent += '</div>'
              }
            }
          }
        })
        // End of HTML generator
        if (!invalidInput && containsMCQ && mcqAnswers.length <= 1) {
          alert(this.$t('editor.survey.emptyMCQAnswers'))
        } else if (answerDuplicates) {
          alert(this.$t('editor.survey.duplicateMCQAnswers'))
        } else if (!invalidInput && !answerDuplicates) {
          this.$emit('create-survey', this.surveyTitle, this.surveyContent, questionIndices, questions, mcqAnswers)
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
