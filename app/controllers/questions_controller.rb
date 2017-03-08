require 'json'
require 'httparty'

class QuestionsController < ApplicationController

  def index
    level = params[:level]
    level = 'hard'
    response = HTTParty.get("https://www.opentdb.com/api.php?amount=1&difficulty=#{level}&type=multiple")

    response = clean_output(response.body)

    response = JSON.parse(response)

    processed_questions = []

    response["results"].each do |item|
      question = item["question"]
      correct_answer = item["correct_answer"]
      all_answers = item["incorrect_answers"] << correct_answer
      random_answers = all_answers.shuffle
      processed_questions << { question: question, answers: random_answers, correct_answer: correct_answer }
    end

    render json: processed_questions
  end

  def clean_output(response_body)
    replacements = {
      "&#039;" => "\'",
      "&quot;" => "\\\"",
      "&amp;"  => "&",
    }

    replacements.each do |encoded, replacement|
      response_body = response_body.gsub(encoded, replacement)
    end

    response_body
  end

end
