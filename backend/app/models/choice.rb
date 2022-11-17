class Choice < ApplicationRecord
    belongs_to :word

    before_save do
        word.touch
    end
end
